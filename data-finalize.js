QUESTION_COUNT=Object.values(QUESTIONS).reduce((n,a)=>n+a.length,0);
if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',()=>{
  document.title='TOEIC 950 Mission Control v1.4.0';
  const badge=document.querySelector('.version-badge');if(badge)badge.textContent='v1.4.0 · True Diversity';
  const side=document.querySelector('.side-card');if(side)side.innerHTML='<b>True Diversity</b><p>Family Deck 會避免同輪與短期跨輪重複句型；題庫數字不再把同句型換名詞當成不同結構。</p>';
  const hero=document.querySelector('#home .hero p');if(hero)hero.innerHTML='從 720 往 950 前進。<b>True Diversity Family Deck</b> 會優先走完未看過的句型家族，再回收舊題；訪客模式與本機備份維持不變。';
});
