QUESTION_COUNT=Object.values(QUESTIONS).reduce((n,a)=>n+a.length,0);
if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',()=>{
  document.title='TOEIC 950 Mission Control v1.6.0';
  const badge=document.querySelector('.version-badge');if(badge)badge.textContent='v1.6.0 · Dynamic Generator';
  const side=document.querySelector('.side-card');if(side)side.innerHTML='<b>Dynamic Generator</b><p>每次開始訓練或重新診斷時即時生成新題；7,710 題舊題庫保留作備援，不再是主要出題來源。</p>';
  const hero=document.querySelector('#home .hero p');if(hero)hero.innerHTML='從 720 往 950 前進。<b>v1.6.0 Dynamic Generator</b> 會依 Part、難度、文法目標與商務情境即時組題，並記錄近期生成指紋避免完全相同題目再次出現。';
  const title=document.querySelector('#practice .title-row span');if(title)title.textContent='即時生成新題＋訓練 / 模考＋近期生成指紋防重複';
  const hint=document.querySelector('#practice .kbd-hint');if(hint)hint.innerHTML='<span class="kbd">A–D</span> 作答　<span class="kbd">Enter</span> 下一題　<span class="kbd">Space</span> 播放 Listening　·　每一輪由 Dynamic Generator 現場組題';
});
