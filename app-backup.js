// ----- Guest mode / backup -----
const BACKUP_FORMAT='toeic950-progress';
const BACKUP_SCHEMA=1;
const ROLLBACK_KEY='toeic950ImportRollbackV1';
const MAX_IMPORT_BYTES=5*1024*1024;

function backupStorageAvailable(){
  try{const k='__toeic950_storage_test__';localStorage.setItem(k,'1');localStorage.removeItem(k);return true}catch(e){return false}
}
function backupNum(v,min=0,max=1e9){const n=Number(v);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min}
function backupSafeString(v,max=20000){return String(v??'').replace(/</g,'‹').replace(/>/g,'›').slice(0,max)}
function backupSafeValue(v,depth=0){
  if(depth>8)return null;
  if(v===null||typeof v==='boolean')return v;
  if(typeof v==='number')return Number.isFinite(v)?v:0;
  if(typeof v==='string')return backupSafeString(v);
  if(Array.isArray(v))return v.slice(0,2500).map(x=>backupSafeValue(x,depth+1));
  if(typeof v==='object'){
    const out={};
    for(const [k,val] of Object.entries(v)){
      if(['__proto__','prototype','constructor'].includes(k))continue;
      out[backupSafeString(k,120)]=backupSafeValue(val,depth+1);
    }
    return out;
  }
  return null;
}
function normalizeImportedData(source){
  if(!source||typeof source!=='object'||Array.isArray(source))throw new Error('備份內容不是有效的學習資料。');
  const base=fresh(),safe=backupSafeValue(source);
  const settings=safe.settings&&typeof safe.settings==='object'?safe.settings:{};
  const practiceSafe=safe.practice&&typeof safe.practice==='object'?safe.practice:{};
  const diagSafe=safe.diag&&typeof safe.diag==='object'?safe.diag:{};
  const out={
    ...base,
    version:APP_VERSION,
    settings:{
      score:backupNum(settings.score,10,990)||720,
      minutes:[30,60,90].includes(Number(settings.minutes))?Number(settings.minutes):60,
      listen:settings.listen===''?'':backupNum(settings.listen,5,495),
      read:settings.read===''?'':backupNum(settings.read,5,495)
    },
    dailyStats:safe.dailyStats&&typeof safe.dailyStats==='object'&&!Array.isArray(safe.dailyStats)?safe.dailyStats:{},
    history:safe.history&&typeof safe.history==='object'&&!Array.isArray(safe.history)?safe.history:{},
    diag:{...base.diag,...diagSafe},
    practice:{...base.practice,...practiceSafe,partStats:practiceSafe.partStats&&typeof practiceSafe.partStats==='object'?practiceSafe.partStats:{}},
    errors:Array.isArray(safe.errors)?safe.errors.slice(0,1000):[],
    vocabKnown:Array.isArray(safe.vocabKnown)?safe.vocabKnown.slice(0,1000):[],
    vocabSeen:safe.vocabSeen&&typeof safe.vocabSeen==='object'&&!Array.isArray(safe.vocabSeen)?safe.vocabSeen:{}
  };
  if(!Array.isArray(out.diag.list))out.diag.list=[];
  if(!Array.isArray(out.diag.answers))out.diag.answers=[];
  if(!out.diag.byPart||typeof out.diag.byPart!=='object')out.diag.byPart={};
  if(!out.diag.audioPlayed||typeof out.diag.audioPlayed!=='object')out.diag.audioPlayed={};
  out.practice.total=backupNum(out.practice.total,0,1e7);
  out.practice.correct=backupNum(out.practice.correct,0,out.practice.total);
  return out;
}
function backupSummary(source=data){
  const hist=source?.history&&typeof source.history==='object'?source.history:{};
  return{
    questions:backupNum(source?.practice?.total,0,1e7),
    days:Object.values(hist).filter(v=>Number(v)>0).length,
    errors:Array.isArray(source?.errors)?source.errors.length:0,
    vocab:Array.isArray(source?.vocabKnown)?source.vocabKnown.length:0
  };
}
function setBackupStatus(message,type='info'){
  const el=document.getElementById('backupStatus');if(!el)return;
  el.textContent=message;el.dataset.type=type;
}
function renderBackup(){
  const s=backupSummary();
  const map={backupQuestions:s.questions,backupDays:s.days,backupErrors:s.errors,backupVocab:s.vocab};
  Object.entries(map).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.textContent=val});
  const storage=document.getElementById('guestStorageStatus');
  if(storage)storage.textContent=backupStorageAvailable()?'本機儲存可用':'本機儲存受限';
  const rollback=document.getElementById('rollbackImportBtn');
  if(rollback)rollback.classList.toggle('hidden',!localStorage.getItem(ROLLBACK_KEY));
}
function exportProgress(){
  const payload={format:BACKUP_FORMAT,schemaVersion:BACKUP_SCHEMA,appVersion:APP_VERSION,exportedAt:new Date().toISOString(),data};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=`toeic950-progress-${today()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
  setBackupStatus(`已匯出 ${a.download}。此檔案只包含你的本機學習紀錄。`,'success');
  renderBackup();
}
function openImportPicker(){const input=document.getElementById('backupImportFile');if(input)input.click()}
function extractBackupData(parsed){
  if(parsed?.format===BACKUP_FORMAT){
    if(Number(parsed.schemaVersion)>BACKUP_SCHEMA)throw new Error('此備份來自較新的格式，請先更新網站後再匯入。');
    if(!parsed.data)throw new Error('備份檔缺少 data 欄位。');
    return parsed.data;
  }
  if(parsed&&typeof parsed==='object'&&(parsed.settings||parsed.practice||parsed.dailyStats))return parsed;
  throw new Error('不是 TOEIC 950 可辨識的學習紀錄檔。');
}
async function importProgressFile(input){
  const file=input?.files?.[0];if(!file)return;
  try{
    if(file.size>MAX_IMPORT_BYTES)throw new Error('備份檔超過 5 MB，為安全起見不匯入。');
    setBackupStatus('正在檢查備份檔…');
    const parsed=JSON.parse(await file.text()),candidate=normalizeImportedData(extractBackupData(parsed)),s=backupSummary(candidate);
    const ok=confirm(`準備匯入學習紀錄：\n\n累積作答：${s.questions} 題\n訓練天數：${s.days} 天\n錯題：${s.errors} 題\n熟悉單字：${s.vocab} 個\n\n匯入會取代目前這台裝置的進度。是否繼續？`);
    if(!ok){setBackupStatus('已取消匯入。');return}
    try{localStorage.setItem(ROLLBACK_KEY,JSON.stringify(data))}catch(e){}
    data=candidate;save();updateAll();renderBackup();
    setBackupStatus(`匯入完成：${s.questions} 題作答、${s.days} 個訓練日已還原。`,'success');
  }catch(err){
    console.error(err);setBackupStatus(`匯入失敗：${err.message||'檔案格式錯誤'}`,'error');
  }finally{input.value=''}
}
function rollbackImport(){
  try{
    const raw=localStorage.getItem(ROLLBACK_KEY);if(!raw)throw new Error('沒有可還原的匯入前紀錄。');
    data=normalizeImportedData(JSON.parse(raw));save();localStorage.removeItem(ROLLBACK_KEY);updateAll();renderBackup();
    setBackupStatus('已還原成上一次匯入前的學習紀錄。','success');
  }catch(err){setBackupStatus(`還原失敗：${err.message}`,'error')}
}
const backupNav=document.querySelector('[data-go="backup"]');
if(backupNav)backupNav.addEventListener('click',()=>setTimeout(renderBackup,0));
