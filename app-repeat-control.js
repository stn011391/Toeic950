// v1.5.0 Similarity Shield
// Prevent repetition by actual sentence/document structure, not only manually assigned family IDs.
const RECENT_QUESTION_KEY='toeic950RecentQuestionsV3';
const STRUCTURE_KEEP=new Set(('the a an this that these those i you he she it we they me him her us them my your his its our their who whom whose what which where when why how do does did have has had can could will would shall should may might must is are was were be been being to of in on at by for from with about into over after before between under during through despite although though because if unless until while once since as than and or but so not only no nor either neither whether rather provided given amid irrespective according per via each every all any some much many more most less least few several both another other same own such enough too very still already yet then now here there up down out off again just even also else ever never around across against toward towards upon within without among beside near past due lest wherever whenever however whoever whatever').split(/\s+/));
function loadRepeatState(){
  try{const x=JSON.parse(localStorage.getItem(RECENT_QUESTION_KEY)||'null');if(x&&Array.isArray(x.ids)&&Array.isArray(x.families)&&Array.isArray(x.groups)&&Array.isArray(x.structures)&&Array.isArray(x.options))return x}catch(e){}
  return{ids:[],families:[],groups:[],structures:[],options:[]};
}
let repeatState=loadRepeatState();
function saveRepeatState(){try{localStorage.setItem(RECENT_QUESTION_KEY,JSON.stringify(repeatState))}catch(e){}}
function familyOf(q){return q?.family||q?.id||'unknown'}
function groupKeyOf(q){if(q?.part===3||q?.part===4)return q.spoken||q.id;if(q?.part===6||q?.part===7)return q.passage||q.id;return q.id}
function sourceTextOf(q){if(q?.part===3||q?.part===4)return q.spoken||q.prompt||'';if(q?.part===6||q?.part===7)return q.passage||q.prompt||'';return q?.prompt||''}
function structureSkeletonText(text){
  const words=String(text||'').toLowerCase()
    .replace(/\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december)\b/g,' <t> ')
    .replace(/\$?\d+(?::\d+)?(?:\s*(?:a\.m\.|p\.m\.|am|pm))?/g,' <n> ')
    .replace(/_{3,}/g,' _____ ')
    .replace(/[^a-z<>_']+/g,' ')
    .trim().split(/\s+/).filter(Boolean)
    .map(w=>STRUCTURE_KEEP.has(w)||w==='_____'||/^<.*>$/.test(w)?w:'x');
  const out=[];for(const w of words){if(w==='x'&&out[out.length-1]==='x')continue;out.push(w)}return out.join(' ');
}
function structureOf(q){return `P${q?.part||0}|${structureSkeletonText(sourceTextOf(q))}`}
function optionSignature(q){if(!q?.opts)return'';return q.opts.map(x=>String(x).toLowerCase().replace(/\s+/g,' ').trim()).sort().join('¦')}
function skillOf(q){return String(q?.cause||'other').replace(/\s+/g,'').toLowerCase()}
function structureSimilarity(a,b){
  if(!a||!b)return 0;if(a===b)return 1;
  const A=a.split(/\s+/),B=b.split(/\s+/),ga=new Set(),gb=new Set();for(let i=0;i<A.length-1;i++)ga.add(A[i]+' '+A[i+1]);for(let i=0;i<B.length-1;i++)gb.add(B[i]+' '+B[i+1]);if(!ga.size||!gb.size)return 0;let inter=0;for(const x of ga)if(gb.has(x))inter++;return inter/(ga.size+gb.size-inter||1);
}
function pushUniqueRecent(arr,value,max){if(!value)return;const i=arr.indexOf(value);if(i>=0)arr.splice(i,1);arr.push(value);if(arr.length>max)arr.splice(0,arr.length-max)}
function rememberQuestionExposure(list){for(const q of list){if(!q?.id)continue;pushUniqueRecent(repeatState.ids,q.id,2600);pushUniqueRecent(repeatState.families,familyOf(q),1000);pushUniqueRecent(repeatState.groups,groupKeyOf(q),1400);pushUniqueRecent(repeatState.structures,structureOf(q),900);pushUniqueRecent(repeatState.options,optionSignature(q),500)}saveRepeatState()}
function clearQuestionCooldown(){repeatState={ids:[],families:[],groups:[],structures:[],options:[]};saveRepeatState()}
function difficultyQuestions(part,level){const all=QUESTIONS[part]||[];if(level===720)return all.filter(q=>q.difficulty<=800);if(level===800)return all.filter(q=>q.difficulty>=800&&q.difficulty<=900);if(level===900)return all.filter(q=>q.difficulty>=900);return all.filter(q=>q.difficulty>=950)}
function fallbackQuestions(part,level){const all=QUESTIONS[part]||[];if(level===950)return all.filter(q=>q.difficulty>=900);if(level===900)return all.filter(q=>q.difficulty>=800);return all}
function unitize(part,questions){
  if(part===2||part===5){const m=new Map();for(const q of questions){const key=structureOf(q);if(!m.has(key))m.set(key,[]);m.get(key).push(q)}return [...m].map(([key,qs])=>({family:familyOf(qs[0]),key,structure:key,skill:skillOf(qs[0]),option:optionSignature(qs[0]),qs}))}
  const m=new Map();for(const q of questions){const key=groupKeyOf(q);if(!m.has(key))m.set(key,[]);m.get(key).push(q)}return [...m].map(([key,qs])=>({family:familyOf(qs[0]),key,structure:structureOf(qs[0]),skill:skillOf(qs[0]),option:'',qs}))
}
function chooseUnitVariant(unit,recentGroups,recentIds){const fresh=unit.qs.filter(q=>!recentGroups.has(groupKeyOf(q))&&!recentIds.has(q.id));const semi=unit.qs.filter(q=>!recentIds.has(q.id));const source=fresh.length?fresh:semi.length?semi:unit.qs;if(!source.length)return[];if(source[0].part===2||source[0].part===5)return[shuffle(source)[0]];return [...source].sort((a,b)=>a.id.localeCompare(b.id))}
function maxSimilarity(sig,list){let m=0;for(const x of list){const v=structureSimilarity(sig,x);if(v>m)m=v;if(m===1)break}return m}
function structureThreshold(part,recent=false){if(part===2||part===5)return recent?.84:.78;return recent?.93:.88}
function selectUnits(part,units,need,stage,existing=[]){
  const chosen=[...existing],chosenKeys=new Set(chosen.map(u=>u.key)),chosenFamilies=new Set(chosen.map(u=>u.family)),chosenStructures=chosen.map(u=>u.structure),chosenOptions=new Set(chosen.map(u=>u.option).filter(Boolean)),skillCounts=new Map();chosen.forEach(u=>skillCounts.set(u.skill,(skillCounts.get(u.skill)||0)+1));
  const recentIds=new Set(repeatState.ids),recentGroups=new Set(repeatState.groups),recentFamilies=new Set(repeatState.families),recentStructures=repeatState.structures.filter(s=>s.startsWith(`P${part}|`)).slice(-120),recentOptions=new Set(repeatState.options.slice(-80));
  let candidates=shuffle(units);
  while(chosen.length<need){
    let best=null,bestScore=-1e9;
    for(const u of candidates){
      if(chosenKeys.has(u.key)||chosenFamilies.has(u.family))continue;
      if(stage.recent&&recentFamilies.has(u.family))continue;
      if(stage.recent&&recentGroups.has(u.key))continue;
      if(stage.recent&&recentStructures.includes(u.structure))continue;
      if(stage.option&&u.option&&recentOptions.has(u.option))continue;
      const sameSim=maxSimilarity(u.structure,chosenStructures);if(stage.similar&&sameSim>=structureThreshold(part,false))continue;
      const recentSim=stage.recentSimilar?maxSimilarity(u.structure,recentStructures):0;if(stage.recentSimilar&&recentSim>=structureThreshold(part,true))continue;
      const skillCount=skillCounts.get(u.skill)||0;if(stage.skillCap&&skillCount>=2)continue;
      if(stage.option&&u.option&&chosenOptions.has(u.option))continue;
      let score=Math.random();score+=(skillCount===0?8:skillCount===1?2:0);score+=(recentFamilies.has(u.family)?0:3);score+=(recentStructures.includes(u.structure)?0:3);score-=sameSim*5;score-=recentSim*3;if(u.option&&!recentOptions.has(u.option))score+=1;
      if(score>bestScore){best=u;bestScore=score}
    }
    if(!best)break;chosen.push(best);chosenKeys.add(best.key);chosenFamilies.add(best.family);chosenStructures.push(best.structure);if(best.option)chosenOptions.add(best.option);skillCounts.set(best.skill,(skillCounts.get(best.skill)||0)+1);
  }
  return chosen;
}
function diversePick(part,level,count){
  const primary=difficultyQuestions(part,level),fallback=fallbackQuestions(part,level),all=QUESTIONS[part]||[];
  const primaryUnits=unitize(part,primary),fallbackUnits=unitize(part,fallback),allUnits=unitize(part,all),need=count;
  const stages=[
    {recent:true,recentSimilar:true,similar:true,skillCap:true,option:true},
    {recent:true,recentSimilar:true,similar:true,skillCap:false,option:true},
    {recent:true,recentSimilar:false,similar:true,skillCap:true,option:false},
    {recent:false,recentSimilar:false,similar:true,skillCap:true,option:false},
    {recent:false,recentSimilar:false,similar:true,skillCap:false,option:false},
    {recent:false,recentSimilar:false,similar:false,skillCap:false,option:false}
  ];
  let chosen=[];for(const stage of stages){chosen=selectUnits(part,primaryUnits,need,stage,chosen);if(chosen.length>=need)break;chosen=selectUnits(part,fallbackUnits,need,stage,chosen);if(chosen.length>=need)break;chosen=selectUnits(part,allUnits,need,stage,chosen);if(chosen.length>=need)break}
  const recentGroups=new Set(repeatState.groups),recentIds=new Set(repeatState.ids),out=[];for(const u of chosen){out.push(...chooseUnitVariant(u,recentGroups,recentIds));if(out.length>=count)break}return out.slice(0,count)
}
function difficultyPool(part,level,count=10){return diversePick(part,level,count)}
startPractice=function(){
  resetPractice();const p=+document.getElementById('practicePart').value,count=+document.getElementById('practiceCount').value,level=chosenDifficulty();const raw=diversePick(p,level,count);practice.list=raw.map(prepareQuestion);practice.start=Date.now();practice.currentStarted=Date.now();practice.timer=setInterval(updateTimer,1000);document.getElementById('practiceBox').classList.remove('hidden');renderPractice();focusQuestionBox('practiceBox');
  if(practice.list.length){rememberQuestionExposure(raw);const msg=document.getElementById('pracMessage');if(msg&&!practice.answers.length)msg.textContent='Similarity Shield：依真正語法骨架、答案組合與近期題目相似度避重複。'}
};
