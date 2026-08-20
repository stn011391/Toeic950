// Remove any accidental exact duplicates created by context-free generated stems.
for(const p of [2,3,4,5,6,7]){
  const seen=new Set();
  QUESTIONS[p]=QUESTIONS[p].filter(q=>{
    const fp=[q.part,q.prompt,q.passage||'',q.spoken||'',q.opts.join('|')].join('§');
    if(seen.has(fp))return false;seen.add(fp);return true;
  });
}
