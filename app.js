// ----- Keyboard -----
document.addEventListener('keydown',e=>{const tag=document.activeElement?.tagName;if(['INPUT','SELECT','TEXTAREA'].includes(tag))return;const practiceActive=document.getElementById('practice').classList.contains('active')&&!document.getElementById('practiceBox').classList.contains('hidden'),diagActive=document.getElementById('diagnostic').classList.contains('active')&&!document.getElementById('diagBox').classList.contains('hidden');if(!practiceActive&&!diagActive)return;if(e.code==='Space'){e.preventDefault();practiceActive?playPracticeAudio():playDiagAudio();return}if(e.key==='Enter'){e.preventDefault();if(practiceActive&&practice.answered)nextPractice();else if(diagActive&&data.diag.currentAnswered)nextDiag();return}const map={a:0,b:1,c:2,d:3,'1':0,'2':1,'3':2,'4':3},i=map[e.key.toLowerCase()];if(i===undefined)return;e.preventDefault();const box=practiceActive?'#practiceBox':'#diagBox',btn=document.querySelector(`${box} .opt[data-index="${i}"]`);if(btn&&!btn.disabled)btn.click()});

function updateVersionUI(){document.title=`TOEIC 950 Mission Control ${APP_VERSION}`;const badge=document.querySelector('.version-badge');if(badge)badge.textContent=`${APP_VERSION} · Dynamic Generator`;const card=document.querySelector('.side-card');if(card)card.innerHTML='<b>Dynamic Generator</b><p>每次開始訓練或重新診斷時現場生成新題；近期完全相同題目會由生成指紋擋掉。</p>'}

// ----- Part 6 quick-flow UX -----
function installPart6UX(){
  if(window.__part6UXInstalled)return;
  window.__part6UXInstalled=true;
  const style=document.createElement('style');
  style.id='part6QuickFlowStyles';
  style.textContent=`
    .part6-layout.practice-layout.split{grid-template-columns:minmax(0,1.12fr) minmax(390px,.88fr);align-items:start}
    .part6-layout .passage-pane{position:sticky;top:42px;max-height:72vh;overflow:auto;font-size:15px;line-height:1.65}
    .part6-layout .answer-pane{min-width:0;padding-bottom:72px}
    .part6-layout .answer-pane>.example{display:none}
    .part6-layout .answer-pane .question{font-size:20px;margin-top:8px}
    .part6-layout .answer-pane .option-list{grid-template-columns:1fr}
    .part6-layout .answer-pane .opt{min-height:52px}
    .part6-next-fab{position:fixed;right:30px;bottom:24px;z-index:80;border:0;border-radius:999px;background:#365cf5;color:#fff;padding:14px 20px;font-weight:900;font-size:16px;box-shadow:0 14px 34px rgba(54,92,245,.32);display:flex;align-items:center;gap:10px;opacity:0;transform:translateY(12px);transition:.16s ease}
    .part6-next-fab.show{opacity:1;transform:none}
    .part6-next-fab:hover{transform:translateY(-2px)}
    .part6-next-fab span{font-size:11px;font-weight:800;opacity:.78;border:1px solid rgba(255,255,255,.35);border-radius:6px;padding:2px 6px}
    @media(max-width:900px){
      .part6-layout.practice-layout.split{grid-template-columns:1fr}
      .part6-layout .passage-pane{position:relative;top:auto;max-height:42vh}
      .part6-layout .answer-pane{padding-bottom:86px}
      .part6-next-fab{left:14px;right:14px;bottom:12px;justify-content:center;width:calc(100% - 28px)}
    }
  `;
  document.head.appendChild(style);

  const originalQuestionLayout=questionLayout;
  questionLayout=function(q,content,context){
    if(q?.part===6&&q.passage){
      const passage=`<div class="passage-pane">${q.passage}</div>`;
      return `<div class="qhead"><span>${context} · Part ${q.part}</span><span><span class="difficulty-pill">${q.difficulty}+</span></span></div><div class="practice-layout split part6-layout">${passage}<div class="answer-pane">${content}</div></div>`;
    }
    return originalQuestionLayout(q,content,context);
  };

  const clearPart6Fab=()=>{const old=document.getElementById('part6NextFab');if(old)old.remove()};
  const showPart6Fab=(mode)=>{
    clearPart6Fab();
    const btn=document.createElement('button');
    btn.id='part6NextFab';btn.className='part6-next-fab';
    if(mode==='practice'){
      const last=practice.i>=practice.list.length-1;
      btn.innerHTML=`${last?'完成本輪':'下一題'} → <span>Enter ↵</span>`;
      btn.onclick=()=>nextPractice();
    }else{
      const last=data.diag.i>=data.diag.list.length-1;
      btn.innerHTML=`${last?'完成診斷':'下一題'} → <span>Enter ↵</span>`;
      btn.onclick=()=>nextDiag();
    }
    document.body.appendChild(btn);requestAnimationFrame(()=>btn.classList.add('show'));
  };

  const originalAnswerPractice=answerPractice;
  answerPractice=function(i,btn){originalAnswerPractice(i,btn);const q=currentPractice();if(q?.part===6&&practice.answered)showPart6Fab('practice')};
  const originalNextPractice=nextPractice;
  nextPractice=function(){clearPart6Fab();originalNextPractice()};
  const originalRenderPractice=renderPractice;
  renderPractice=function(){clearPart6Fab();originalRenderPractice()};
  const originalResetPractice=resetPractice;
  resetPractice=function(){clearPart6Fab();originalResetPractice()};
  const originalFinishPractice=finishPractice;
  finishPractice=function(){clearPart6Fab();originalFinishPractice()};

  const originalAnswerDiag=answerDiag;
  answerDiag=function(i,btn){originalAnswerDiag(i,btn);const q=currentDiag();if(q?.part===6&&data.diag.currentAnswered)showPart6Fab('diag')};
  const originalNextDiag=nextDiag;
  nextDiag=function(){clearPart6Fab();originalNextDiag()};
  const originalRenderDiag=renderDiag;
  renderDiag=function(){clearPart6Fab();originalRenderDiag()};
  const originalResetDiag=resetDiag;
  resetDiag=function(){clearPart6Fab();originalResetDiag()};
}

function updateAll(){loadSettings();updateScoreUI();renderTasks();renderParts();renderVocab();renderErrors();renderProgress();updateDiagStats();if(typeof renderBackup==='function')renderBackup();document.body.classList.toggle('focus-mode',['practice','diagnostic'].some(id=>document.getElementById(id).classList.contains('active')))}
installPart6UX();
initDay();greeting();updateVersionUI();updateAll();
// data-finalize historically also touches version text on DOMContentLoaded; re-apply current UI last.
document.addEventListener('DOMContentLoaded',()=>{updateVersionUI();installPart6UX()});
