const fs=require('fs'),vm=require('vm');
function assert(c,m){if(!c){console.error('FAIL:',m);process.exit(1)}}
const store=new Map();
const base=()=>({version:'v1.3.0',settings:{score:720,minutes:60,listen:'',read:''},dailyStats:{},history:{},diag:{list:[],i:0,correct:0,byPart:{},answers:[],currentAnswered:false,audioPlayed:{}},practice:{total:0,correct:0,partStats:{}},errors:[],vocabKnown:[],vocabSeen:{}});
const ctx={console,APP_VERSION:'v1.3.0',data:base(),fresh:base,today:()=> '2026-08-20',save:()=>{},updateAll:()=>{},confirm:()=>true,Blob:function(){},URL:{createObjectURL:()=>'',revokeObjectURL:()=>{}},setTimeout:()=>{},localStorage:{setItem:(k,v)=>store.set(k,String(v)),getItem:k=>store.has(k)?store.get(k):null,removeItem:k=>store.delete(k)},document:{querySelector:()=>null,getElementById:()=>null,createElement:()=>({click:()=>{},remove:()=>{}}),body:{appendChild:()=>{}}}};
vm.createContext(ctx);
const src=fs.readFileSync('app-backup.js','utf8');
vm.runInContext(src+'\nglobalThis.__api={normalizeImportedData,backupSummary,extractBackupData,BACKUP_FORMAT,BACKUP_SCHEMA};',ctx);
const api=ctx.__api;
assert(api.BACKUP_FORMAT==='toeic950-progress','backup format');assert(api.BACKUP_SCHEMA===1,'backup schema');
const raw={settings:{score:875,minutes:90,listen:440,read:435},practice:{total:123,correct:111,partStats:{}},history:{'2026-08-19':80,'2026-08-20':50},errors:[{q:'<img src=x onerror=1>',why:'test'}],vocabKnown:['allocate','mandatory'],dailyStats:{},diag:{answers:[]},vocabSeen:{}};
const wrapped={format:'toeic950-progress',schemaVersion:1,appVersion:'v1.2.0',data:raw};
const imported=api.normalizeImportedData(api.extractBackupData(wrapped)),s=api.backupSummary(imported);
assert(imported.version==='v1.3.0','import upgrades app version');assert(imported.settings.score===875,'score restored');assert(imported.settings.minutes===90,'minutes restored');assert(s.questions===123,'question count restored');assert(s.days===2,'training days restored');assert(s.errors===1,'errors restored');assert(s.vocab===2,'vocab restored');assert(!imported.errors[0].q.includes('<')&&!imported.errors[0].q.includes('>'),'imported HTML sanitized');
const legacyDefaults=api.normalizeImportedData({settings:{},practice:{}});assert(legacyDefaults.settings.score===720,'legacy missing score uses 720');assert(legacyDefaults.settings.listen===''&&legacyDefaults.settings.read==='','legacy missing LR stays blank');
let futureRejected=false;try{api.extractBackupData({format:'toeic950-progress',schemaVersion:99,data:{}})}catch(e){futureRejected=true}assert(futureRejected,'future schema rejected');
let unknownRejected=false;try{api.extractBackupData({hello:'world'})}catch(e){unknownRejected=true}assert(unknownRejected,'unknown JSON rejected');
console.log('PASS backup-smoke');
