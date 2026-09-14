// v1.6.0 Dynamic Generator bridge
// Loaded before app modules; installs overrides after all legacy functions exist.
document.addEventListener('DOMContentLoaded',()=>{
  if(typeof generateTest!=='function'||typeof generateDiagnosticSet!=='function')return;
  window.startPractice=function(){
    resetPractice();
    const p=+document.getElementById('practicePart').value;
    const count=+document.getElementById('practiceCount').value;
    const level=chosenDifficulty();
    const raw=generateTest(p,level,count);
    practice.list=raw.map(prepareQuestion);
    practice.start=Date.now();practice.currentStarted=Date.now();practice.timer=setInterval(updateTimer,1000);
    document.getElementById('practiceBox').classList.remove('hidden');
    renderPractice();focusQuestionBox('practiceBox');
    const msg=document.getElementById('pracMessage');
    if(msg)msg.textContent=`Dynamic Generator：本輪 ${raw.length} 題即時生成；近期完全相同題目不再回收。`;
  };
  window.makeDiagnostic=function(){return generateDiagnosticSet().map(prepareQuestion)};
});
