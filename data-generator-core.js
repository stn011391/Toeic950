// v1.6.0 Dynamic Generator
// Generates fresh TOEIC-style questions in the browser for every practice/diagnostic run.
const GEN_HISTORY_KEY='toeic950GeneratedHistoryV1';
const GEN_HISTORY_MAX=5000;
const GEN_RECENT_BLUEPRINTS=120;
const GEN_BANK={
  people:['Ms. Chen','Mr. Patel','Ms. Garcia','Mr. Huang','Ms. Park','Mr. Davis','Ms. Lin','Mr. Novak','Ms. Adams','Mr. Kim','Ms. Wu','Mr. Lee'],
  departments:['engineering team','quality team','procurement team','finance department','customer-service team','IT department','marketing team','operations group','HR department','research group','facilities team','logistics team'],
  companies:['Summit Devices','Northstar Components','BluePeak Logistics','Metro Office Supply','BrightLine Creative','Axis Industrial','Evergreen Systems','Harbor Consulting','Precision Works','ServicePro Network','MarketLink Services','East Ridge Metals'],
  docs:['inspection report','deployment checklist','expense summary','supplier quotation','maintenance plan','training schedule','shipping manifest','customer proposal','test report','payment register','service summary','project timeline'],
  items:['prototype housings','replacement motors','laptop computers','test specimens','aluminum brackets','sensor modules','battery packs','display units','sample labels','shipping cartons','office chairs','network adapters'],
  places:['Conference Room 508','materials laboratory','main lobby','Production Hall','Customer Center','training room','service center','Finance Floor','Data Center','creative studio','regional warehouse','inspection area'],
  systems:['quality portal','device-management portal','expense platform','supplier portal','learning portal','service dashboard','project database','asset portal','research database','shipping system'],
  days:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  times:['8:30 A.M.','9:00 A.M.','10:00 A.M.','1:30 P.M.','3:00 P.M.','4:30 P.M.'],
  deadlines:['Monday afternoon','Tuesday morning','Wednesday noon','Thursday afternoon','Friday noon','Friday afternoon','month-end','next Monday'],
  issues:['a dimensional mismatch','an overheating motor','missing receipts','a delayed shipment','an expired certificate','an inconsistent test result','a damaged package','a software error','an invoice discrepancy','an over-capacity session','a connectivity problem','a scheduling conflict'],
  actions:['review the evidence','update the drawing','contact the supplier','prepare a replacement','reschedule the inspection','revise the instructions','confirm the quantity','notify the customer','upload the records','inspect the samples','reconcile the data','book another room'],
  reasons:['the supplier changed the tooling','raw material arrived late','the customer revised the scope','a server certificate expired','attendance exceeded expectations','one sample was damaged','a severe storm delayed freight','the venue changed unexpectedly','additional testing was requested','several records were incomplete'],
  benefits:['reduce processing time','improve traceability','avoid duplicate work','shorten the approval cycle','improve customer response time','reduce shipping errors','increase data accuracy','make the process easier to audit']
};
function genPick(arr){return arr[Math.floor(Math.random()*arr.length)]}
function genShuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function genSeed(){try{const a=new Uint32Array(2);crypto.getRandomValues(a);return `${a[0].toString(36)}${a[1].toString(36)}`}catch(e){return `${Date.now().toString(36)}${Math.random().toString(36).slice(2,9)}`}}
function genCtx(){return{person:genPick(GEN_BANK.people),dept:genPick(GEN_BANK.departments),company:genPick(GEN_BANK.companies),doc:genPick(GEN_BANK.docs),item:genPick(GEN_BANK.items),place:genPick(GEN_BANK.places),system:genPick(GEN_BANK.systems),day:genPick(GEN_BANK.days),time:genPick(GEN_BANK.times),deadline:genPick(GEN_BANK.deadlines),issue:genPick(GEN_BANK.issues),action:genPick(GEN_BANK.actions),reason:genPick(GEN_BANK.reasons),benefit:genPick(GEN_BANK.benefits)}}
function genQ(session,seq,part,difficulty,prompt,opts,a,why,cause,extra={}){return{id:`G-${session}-P${part}-${String(seq).padStart(3,'0')}`,part,difficulty,prompt,opts,a,why,cause,generated:true,...extra}}
function genSignature(q){return [q.part,q.prompt,q.spoken||'',q.passage||'',...(q.opts||[])].join('§').toLowerCase().replace(/\s+/g,' ').trim()}
function loadGenHistory(){try{const h=JSON.parse(localStorage.getItem(GEN_HISTORY_KEY)||'null');if(h&&Array.isArray(h.signatures)&&Array.isArray(h.blueprints))return h}catch(e){}return{signatures:[],blueprints:[]}}
function saveGenHistory(h){try{localStorage.setItem(GEN_HISTORY_KEY,JSON.stringify(h))}catch(e){}}
function pushGenRecent(arr,v,max){const i=arr.indexOf(v);if(i>=0)arr.splice(i,1);arr.push(v);if(arr.length>max)arr.splice(0,arr.length-max)}
function rememberGenerated(list){const h=loadGenHistory();for(const q of list){pushGenRecent(h.signatures,genSignature(q),GEN_HISTORY_MAX);if(q.blueprint)pushGenRecent(h.blueprints,`${q.part}:${q.blueprint}`,GEN_RECENT_BLUEPRINTS)}saveGenHistory(h)}
function recentGenerated(){return loadGenHistory()}
