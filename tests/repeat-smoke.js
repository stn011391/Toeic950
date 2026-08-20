const fs=require('fs'),vm=require('vm');
function assert(c,m){if(!c){console.error('FAIL:',m);process.exit(1)}}
const dataFiles=['data-core.js','data-listening.js','data-part5.js','data-part6.js','data-part7.js','data-expansion-core.js','data-expansion-listening.js','data-expansion-part5.js','data-expansion-reading.js','data-diversity-v2.js','data-diversity-cleanup.js','data.js'];
const store=new Map();
const dummyEl=()=>({textContent:'',value:'720',classList:{add:()=>{},remove:()=>{}},querySelector:()=>null});
const ctx={console,Math,JSON,Set,Map,localStorage:{setItem:(k,v)=>store.set(k,String(v)),getItem:k=>store.has(k)?store.get(k):null,removeItem:k=>store.delete(k)},document:{getElementById:()=>dummyEl(),querySelector:()=>null},practice:{list:[],answers:[]},startPractice:()=>{},resetPractice:()=>{},chosenDifficulty:()=>720,prepareQuestion:q=>q,updateTimer:()=>{},renderPractice:()=>{},focusQuestionBox:()=>{},setInterval:()=>0,Date,shuffle:null};
vm.createContext(ctx);
vm.runInContext(dataFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\nglobalThis.__Q=QUESTIONS;',ctx);
ctx.QUESTIONS=ctx.__Q;ctx.shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
vm.runInContext(fs.readFileSync('app-repeat-control.js','utf8')+'\nglobalThis.__r={diversePick,rememberQuestionExposure,clearQuestionCooldown,familyOf,groupKeyOf};',ctx);
const api=ctx.__r;
function playFive(part,level=720,count=10){api.clearQuestionCooldown();const familiesSeen=new Set(),idsSeen=new Set();let familySlots=0;for(let round=1;round<=5;round++){
  const list=api.diversePick(part,level,count);assert(list.length===count,`Part ${part} round ${round}: expected ${count}, got ${list.length}`);const ids=new Set(list.map(q=>q.id));assert(ids.size===list.length,`Part ${part} round ${round}: duplicate ID inside round`);
  const roundFamilies=new Set(list.map(api.familyOf));const grouped=[3,4,6,7].includes(part);if(!grouped)assert(roundFamilies.size===list.length,`Part ${part} round ${round}: same structural family repeated inside round`);
  const repeatedFamilies=[...roundFamilies].filter(f=>familiesSeen.has(f));assert(repeatedFamilies.length===0,`Part ${part} round ${round}: family repeated from earlier round: ${repeatedFamilies.join(',')}`);
  const repeatedIds=[...ids].filter(id=>idsSeen.has(id));assert(repeatedIds.length===0,`Part ${part} round ${round}: exact question repeated from earlier round`);
  roundFamilies.forEach(f=>familiesSeen.add(f));ids.forEach(id=>idsSeen.add(id));familySlots+=roundFamilies.size;api.rememberQuestionExposure(list);
 }
 return{families:familiesSeen.size,ids:idsSeen.size,familySlots};}
const results={};for(const p of [2,3,4,5,6,7])results[p]=playFive(p,720,10);
assert(results[5].families===50,'Part 5 must deliver 50 different structural families across five 10-question rounds');
assert(results[2].families===50,'Part 2 must deliver 50 different structural families across five 10-question rounds');
console.log('PASS repeat-smoke: five consecutive rounds, zero cross-round structural-family repeats',results);
