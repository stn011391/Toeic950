var QUESTION_COUNT=0;
if(typeof document!=='undefined'){
  document.write('<script src="data-diversity-v2.js"><\/script><script src="data-diversity-contexts.js"><\/script><script src="data-diversity-cleanup.js"><\/script><script src="data-finalize.js"><\/script>');
}else{
  QUESTION_COUNT=Object.values(QUESTIONS).reduce((n,a)=>n+a.length,0);
}
