// v1.5.0 generated-language quality pass
// Repairs combinations where a clause-valued scenario field was inserted into a noun slot,
// plus agreement/article issues revealed by the five-round human audit.
const ISSUE_NOUN_FIXES=new Map([
 ['a dimensional mismatch','a dimensional mismatch'],
 ['three readings outside tolerance','out-of-tolerance readings'],
 ['a requested option is missing','a missing requested option'],
 ['one motor is overheating','an overheating motor'],
 ['two receipts are missing','missing receipts'],
 ['the promised date has slipped','delivery-date slippage'],
 ['the session is over capacity','an over-capacity session'],
 ['several devices cannot connect','a device-connectivity problem'],
 ['one clause conflicts with policy','a policy conflict'],
 ['the product image is outdated','an outdated product image'],
 ['one shipment is on hold','a shipment hold'],
 ['response time has increased','increased response time'],
 ['the first result was inconsistent','an inconsistent test result'],
 ['the third floor is too warm','a cooling problem on the third floor'],
 ['an invoice amount does not match','an invoice discrepancy'],
 ['several badges failed to activate','a badge-activation failure']
]);
function qualityText(s){
  if(typeof s!=='string')return s;
  let out=s;
  for(const [bad,good] of ISSUE_NOUN_FIXES)out=out.split(bad).join(good);
  if(typeof XCTX!=='undefined')for(const c of XCTX){
    out=out.split(`The ${c.supplier}`).join(c.supplier).split(`the ${c.supplier}`).join(c.supplier);
    out=out.split(`The ${c.item} was delivered`).join(`The ${c.doc} was delivered`);
    out=out.split(`The ${c.item} is similar`).join('The proposed solution is similar');
    out=out.split(`The ${c.item} will be replaced`).join('The affected unit will be replaced');
    out=out.split(`The ${c.item} should be inspected`).join('The received items should be inspected');
    out=out.split(`Do you remember where the ${c.item} was stored?`).join('Do you remember where the materials were stored?');
    out=out.split(`Have you already ${c.task}?`).join('Have you already completed the task?');
    out=out.split(`help with ${c.task}`).join('help with the task');
    out=out.split(`Is there a ${c.service} near ${c.location}?`).join(`Is ${c.service} available near ${c.location}?`);
    out=out.split(`Has ${c.supplier} confirmed the ${c.deadline}?`).join(`Has ${c.supplier} confirmed the deadline?`);
    out=out.split(`${c.person} gave us _____ useful advice about the ${ISSUE_NOUN_FIXES.get(c.issue)||c.issue}.`).join(`${c.person} gave us _____ useful advice about the reported issue.`);
  }
  out=out.replace(/provided she finishes the audit first/g,'provided the audit is completed first');
  if(typeof XCTX!=='undefined')for(const c of XCTX)out=out.split(`due to ${c.reason}`).join(`because ${c.reason}`);
  out=out.replace(/panels is installed/g,'panels are installed')
    .replace(/units is installed/g,'units are installed')
    .replace(/\bthe a\b/gi,'a').replace(/\bthe an\b/gi,'an').replace(/\ba an\b/gi,'an');
  return out;
}
for(const arr of Object.values(QUESTIONS))for(const q of arr){
  q.prompt=qualityText(q.prompt);q.spoken=qualityText(q.spoken);q.transcript=qualityText(q.transcript);q.passage=qualityText(q.passage);
  if(Array.isArray(q.opts))q.opts=q.opts.map(qualityText);
  if(q.family?.startsWith('TD-P3-')&&q.spoken){
    const m=q.spoken.match(/^Woman: We have a new issue with (.+?)\. Man: (.+?) Woman: Please update (.+?) before (.+?)\.$/);
    if(m){q.spoken=`Woman: We need to review a new work issue. Man: ${m[2]} Woman: Understood. Please update ${m[3]} before ${m[4]}.`;q.transcript=q.spoken}
  }
  if(q.family?.startsWith('TD-P4-')&&q.spoken){
    const m=q.spoken.match(/^Attention everyone\. This is an update about the (.+?)\. Because (.+?), the (.+?) will make a temporary change on (.+?)\. Please use (.+?) and contact (.+?) if the change affects your work\. Normal arrangements are expected by (.+?)\.$/);
    if(m){q.spoken=`Attention everyone. Because ${m[2]}, the ${m[3]} will make a temporary operational change on ${m[4]}. Please use ${m[5]} and contact ${m[6]} if the change affects your work. Normal arrangements are expected by ${m[7]}.`;q.transcript=q.spoken;if(Array.isArray(q.opts)&&q.cause==='主旨')q.opts[0]='To explain a temporary operational change'}
  }
}
