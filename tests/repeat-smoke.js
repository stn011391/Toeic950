const fs=require('fs'),vm=require('vm');
function assert(c,m){if(!c){console.error('FAIL:',m);process.exit(1)}}
const dataFiles=['data-core.js','data-listening.js','data-part5.js','data-part6.js','data-part7.js','data-expansion-core.js','data-expansion-listening.js','data-expansion-part5.js','data-expansion-reading.js','data.js'];
const store=new Map();
const ctx={console,Math,JSON,Set,Map,QUESTIONS:null,localStorage:{setItem:(k,v)=>store.set(k,String(v)),getItem:k=>store.has(k)?store.get(k):null,removeItem:k=>store.delete(k)},document:{getElementById:()=>({textContent:'',value:'900'}),querySelector:()=>null},practice:{list:[],answers:[]},startPractice:()=>{},shuffle:null};
vm.createContext(ctx);
vm.runInContext(dataFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\nglobalThis.__Q=QUESTIONS;',ctx);
ctx.QUESTIONS=ctx.__Q;
ctx.shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
vm.runInContext(fs.readFileSync('app-repeat-control.js','utf8')+'\nglobalThis.__r={difficultyPool,rememberQuestionExposure,clearQuestionCooldown,familyOf};',ctx);
const api=ctx.__r;
for(const part of [2,3,4,5,6,7]){
  api.clearQuestionCooldown();let prev=new Set();
  for(let round=0;round<30;round++){
    const list=api.difficultyPool(part,900,10);assert(list.length===10,`Part ${part} round ${round}: expected 10`);
    const ids=new Set(list.map(q=>q.id));assert(ids.size===10,`Part ${part} round ${round}: duplicate inside round`);
    if(round>0){const overlap=[...ids].filter(id=>prev.has(id));assert(overlap.length===0,`Part ${part} immediate exact repeat: ${overlap.join(',')}`)}
    api.rememberQuestionExposure(list);prev=ids;
  }
}
console.log('PASS repeat-smoke: 30 rounds x 10 questions across Parts 2–7 with zero adjacent exact repeats');
