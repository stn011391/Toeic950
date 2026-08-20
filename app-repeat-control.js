// v1.4.0 Family Deck engine
// Goal: prevent 'same sentence pattern, different nouns' repetition.
const RECENT_QUESTION_KEY='toeic950RecentQuestionsV2';
function loadRepeatState(){
  try{const x=JSON.parse(localStorage.getItem(RECENT_QUESTION_KEY)||'null');if(x&&Array.isArray(x.ids)&&Array.isArray(x.families)&&Array.isArray(x.groups))return x}catch(e){}
  return{ids:[],families:[],groups:[]};
}
let repeatState=loadRepeatState();
function saveRepeatState(){try{localStorage.setItem(RECENT_QUESTION_KEY,JSON.stringify(repeatState))}catch(e){}}
function familyOf(q){return q?.family||q?.id||'unknown'}
function groupKeyOf(q){if(q?.part===3||q?.part===4)return q.spoken||q.id;if(q?.part===6||q?.part===7)return q.passage||q.id;return q.id}
function pushUniqueRecent(arr,value,max){const i=arr.indexOf(value);if(i>=0)arr.splice(i,1);arr.push(value);if(arr.length>max)arr.splice(0,arr.length-max)}
function rememberQuestionExposure(list){for(const q of list){if(!q?.id)continue;pushUniqueRecent(repeatState.ids,q.id,2400);pushUniqueRecent(repeatState.families,familyOf(q),900);pushUniqueRecent(repeatState.groups,groupKeyOf(q),1200)}saveRepeatState()}
function clearQuestionCooldown(){repeatState={ids:[],families:[],groups:[]};saveRepeatState()}
function difficultyQuestions(part,level){const all=QUESTIONS[part]||[];if(level===720)return all.filter(q=>q.difficulty<=800);if(level===800)return all.filter(q=>q.difficulty>=800&&q.difficulty<=900);if(level===900)return all.filter(q=>q.difficulty>=900);return all.filter(q=>q.difficulty>=950)}
function fallbackQuestions(part,level){const all=QUESTIONS[part]||[];if(level===950)return all.filter(q=>q.difficulty>=900);if(level===900)return all.filter(q=>q.difficulty>=800);return all}
function unitize(part,questions){
  if(part===2||part===5){const m=new Map();for(const q of questions){const f=familyOf(q);if(!m.has(f))m.set(f,[]);m.get(f).push(q)}return [...m].map(([family,qs])=>({family,key:family,qs}))}
  const m=new Map();for(const q of questions){const key=groupKeyOf(q);if(!m.has(key))m.set(key,[]);m.get(key).push(q)}return [...m].map(([key,qs])=>({family:familyOf(qs[0]),key,qs}))
}
// Select up to `count` distinct units first. Grouped Parts can have fewer eligible questions
// per document after difficulty filtering, so using count here guarantees enough material.
function neededUnits(part,count){return count}
function recentFamilySet(eligibleFamilies,need){const familySet=new Set(eligibleFamilies),maxRecent=Math.max(0,familySet.size-need);const out=[];for(let i=repeatState.families.length-1;i>=0&&out.length<maxRecent;i--){const f=repeatState.families[i];if(familySet.has(f)&&!out.includes(f))out.push(f)}return new Set(out)}
function recentGroupSet(keys){const set=new Set(keys),limit=Math.max(0,set.size-1),out=[];for(let i=repeatState.groups.length-1;i>=0&&out.length<limit;i--){const k=repeatState.groups[i];if(set.has(k)&&!out.includes(k))out.push(k)}return new Set(out)}
function chooseUnitVariant(unit,recentGroups,recentIds){const fresh=unit.qs.filter(q=>!recentGroups.has(groupKeyOf(q))&&!recentIds.has(q.id));const semi=unit.qs.filter(q=>!recentIds.has(q.id));const source=fresh.length?fresh:semi.length?semi:unit.qs;if(!source.length)return[];if(source[0].part===2||source[0].part===5)return[shuffle(source)[0]];return [...source].sort((a,b)=>a.id.localeCompare(b.id))}
function diversePick(part,level,count){
  const primary=difficultyQuestions(part,level),fallback=fallbackQuestions(part,level),all=QUESTIONS[part]||[],need=neededUnits(part,count);
  const primaryUnits=unitize(part,primary),fallbackUnits=unitize(part,fallback),allUnits=unitize(part,all);
  const eligibleFamilies=[...new Set(primaryUnits.map(u=>u.family))],recentFamilies=recentFamilySet(eligibleFamilies,Math.min(need,eligibleFamilies.length)),recentIds=new Set(repeatState.ids),recentGroups=recentGroupSet(allUnits.map(u=>u.key));
  const chosen=[],chosenFamilies=new Set(),chosenKeys=new Set();
  function take(units,avoidFamilies=true,avoidGroups=true){for(const u of shuffle(units)){if(chosenFamilies.has(u.family)||chosenKeys.has(u.key))continue;if(avoidFamilies&&recentFamilies.has(u.family))continue;if(avoidGroups&&recentGroups.has(u.key))continue;chosen.push(u);chosenFamilies.add(u.family);chosenKeys.add(u.key);if(chosen.length>=need)return true}return false}
  if(!take(primaryUnits,true,true))if(!take(primaryUnits,true,false))if(!take(fallbackUnits,true,true))if(!take(fallbackUnits,true,false))if(!take(primaryUnits,false,true))if(!take(primaryUnits,false,false))if(!take(allUnits,false,true))take(allUnits,false,false);
  const out=[];for(const u of chosen){out.push(...chooseUnitVariant(u,recentGroups,recentIds));if(out.length>=count)break}
  return out.slice(0,count)
}
function difficultyPool(part,level,count=10){return diversePick(part,level,count)}
const startPracticeBeforeFamilyDeck=startPractice;
startPractice=function(){
  resetPractice();const p=+document.getElementById('practicePart').value,count=+document.getElementById('practiceCount').value,level=chosenDifficulty();const raw=diversePick(p,level,count);practice.list=raw.map(prepareQuestion);practice.start=Date.now();practice.currentStarted=Date.now();practice.timer=setInterval(updateTimer,1000);document.getElementById('practiceBox').classList.remove('hidden');renderPractice();focusQuestionBox('practiceBox');
  if(practice.list.length){rememberQuestionExposure(raw);const msg=document.getElementById('pracMessage');if(msg&&!practice.answers.length)msg.textContent='Family Deck：同輪不重複句型，跨輪優先走完未看過的句型家族。'}
};
