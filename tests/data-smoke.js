const fs=require('fs'),vm=require('vm');
const files=['data-core.js','data-listening.js','data-part5.js','data-part6.js','data-part7.js','data-expansion-core.js','data-expansion-listening.js','data-expansion-part5.js','data-expansion-reading.js','data.js'];
const src=files.map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\n;globalThis.__toeic={QUESTIONS,QUESTION_COUNT,APP_VERSION};';
vm.runInThisContext(src,{filename:'toeic-data-bundle.js'});
const {QUESTIONS,QUESTION_COUNT,APP_VERSION}=globalThis.__toeic;const parts=[2,3,4,5,6,7],all=parts.flatMap(p=>QUESTIONS[p]||[]);
function assert(c,m){if(!c){console.error('FAIL:',m);process.exit(1)}}
assert(APP_VERSION==='v1.3.0','version mismatch');assert(QUESTION_COUNT===all.length,'QUESTION_COUNT mismatch');assert(QUESTION_COUNT===6292,`expected 6292 questions, got ${QUESTION_COUNT}`);assert(new Set(all.map(q=>q.id)).size===all.length,'question IDs must be unique');
for(const q of all){assert(Array.isArray(q.opts)&&q.opts.length>=3,`${q.id}: invalid options`);assert(Number.isInteger(q.a)&&q.a>=0&&q.a<q.opts.length,`${q.id}: invalid answer index`);assert(q.prompt&&q.why&&q.cause,`${q.id}: missing metadata`)}
const fp=q=>[q.part,q.prompt,q.passage||'',q.spoken||'',q.opts.join('|')].join('§');assert(new Set(all.map(fp)).size===all.length,'exact question fingerprints must be unique');const families=new Set(all.map(q=>q.family).filter(Boolean));assert(families.size>=175,`need 175+ expansion families, got ${families.size}`);
const expected={2:700,3:996,4:996,5:1184,6:1008,7:1408};for(const p of parts)assert(QUESTIONS[p].length===expected[p],`Part ${p}: expected ${expected[p]}, got ${QUESTIONS[p].length}`);assert(QUESTIONS[5].filter(q=>q.difficulty>=950).length>=300,'Part 5 950 pool too small');assert(QUESTIONS[7].filter(q=>q.passage?.includes('DOCUMENT 2')).length>=300,'Part 7 multi-doc pool too small');console.log(`PASS data-smoke: ${QUESTION_COUNT} questions, ${families.size} expansion families`);
