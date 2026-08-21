var QUESTION_COUNT=0;
if(typeof document!=='undefined'){
  const v=encodeURIComponent(typeof APP_VERSION!=='undefined'?APP_VERSION:'v1.5.0');
  document.write('<script src="data-diversity-v2.js?v='+v+'"><\/script><script src="data-diversity-contexts.js?v='+v+'"><\/script><script src="data-quality-fixes.js?v='+v+'"><\/script><script src="data-diversity-cleanup.js?v='+v+'"><\/script><script src="data-finalize.js?v='+v+'"><\/script>');
}else{
  QUESTION_COUNT=Object.values(QUESTIONS).reduce((n,a)=>n+a.length,0);
}
