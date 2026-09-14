const fs=require('fs'),vm=require('vm');
const store=new Map();global.localStorage={getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)};
const files=['data-generator-core.js','data-generator-p5.js','data-generator-listening.js','data-generator-reading.js'];
for(const f of files)vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});
function assert(c,m){if(!c){console.error('FAIL:',m);process.exit(1)}}
const allSigs=new Set();
for(const part of [2,3,4,5,6,7]){
  for(let round=1;round<=5;round++){
    const list=generateTest(part,part===5?720:800,10);
    assert(list.length===10,`Part ${part} round ${round}: expected 10, got ${list.length}`);
    const roundSigs=new Set();
    for(const q of list){
      assert(q.generated===true,`${q.id}: not generated`);
      assert(q.part===part,`${q.id}: wrong part`);
      assert(q.prompt&&q.why&&q.cause,`${q.id}: missing prompt/why/cause`);
      assert(Array.isArray(q.opts)&&q.opts.length>=3,`${q.id}: invalid options`);
      assert(Number.isInteger(q.a)&&q.a>=0&&q.a<q.opts.length,`${q.id}: invalid answer`);
      const sig=genSignature(q);assert(!roundSigs.has(sig),`Part ${part}: duplicate inside round`);roundSigs.add(sig);
      assert(!allSigs.has(sig),`Part ${part}: exact generated question repeated across rounds`);allSigs.add(sig);
      if(part<=4)assert(q.spoken||part===2,`${q.id}: listening item missing spoken content`);
      if(part>=6)assert(q.passage,`${q.id}: reading item missing passage`);
    }
  }
}
const diag=generateDiagnosticSet();assert(diag.length===36,`diagnostic expected 36, got ${diag.length}`);for(const p of [2,3,4,5,6,7])assert(diag.filter(q=>q.part===p).length===6,`diagnostic Part ${p} must have 6`);
console.log(`PASS generator-smoke: ${allSigs.size} unique generated questions across 30 rounds + 36-question diagnostic`);
