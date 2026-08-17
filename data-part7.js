const P7BASE=[
 {pass:'NOTICE\nThe {place} will close at {close} on {date} for {reason}. {service} will remain available until {last}. Regular hours resume {resume}.',vars:[
  {place:'Harbor Café',close:'3:00 P.M.',date:'August 21',reason:'a private event',service:'Mobile-app takeout orders',last:'2:30 P.M.',resume:'the following morning'},
  {place:'Westside Library',close:'5:00 P.M.',date:'September 4',reason:'electrical maintenance',service:'Book returns at the outside slot',last:'8:00 P.M.',resume:'the next day'},
  {place:'City Fitness Center',close:'6:00 P.M.',date:'October 12',reason:'staff training',service:'Online class booking',last:'midnight',resume:'Monday morning'},
  {place:'Riverside Pharmacy',close:'7:00 P.M.',date:'November 3',reason:'inventory counting',service:'Prescription pickup at the drive-through window',last:'6:30 P.M.',resume:'the following morning'}],q:[
   ['Why will the location close early?',['For a scheduled special reason','For a permanent shutdown','For a price increase','For a hiring event'],0,'定位'],
   ['What service remains available?',['A limited alternative service','All services without restriction','Only staff training','No service at all'],0,'細節'],
   ['What will happen later?',['Regular hours will resume','The site will never reopen','The business will move overseas','All customers must re-register'],0,'推論'],
   ['What is the main purpose of the notice?',['To explain a temporary operating change','To advertise a job','To announce a merger','To publish financial results'],0,'主旨']]},
 {pass:'EMAIL\nFrom: {sender}\nTo: {receiver}\nSubject: {subject}\nThe {asset} is mostly ready, but {issue}. I asked {party} to send the revised version by {deadline}. Please continue {task} today; you can update the final file when the revision arrives.',vars:[
  {sender:'Olivia Park',receiver:'Daniel Wu',subject:'Product Photos',asset:'catalog photography',issue:'the blue-model images need color correction',party:'the studio',deadline:'tomorrow noon',task:'the text layout'},
  {sender:'Mina Lee',receiver:'Evan Chen',subject:'Proposal Charts',asset:'presentation deck',issue:'two charts need updated labels',party:'the analyst',deadline:'4 P.M.',task:'the speaker notes'},
  {sender:'Carlos Ruiz',receiver:'Nora Kim',subject:'Website Copy',asset:'landing page',issue:'the pricing paragraph needs legal review',party:'the legal team',deadline:'Friday morning',task:'the image placement'},
  {sender:'Aya Mori',receiver:'Ken Lin',subject:'Assembly Drawing',asset:'drawing package',issue:'the connector note needs correction',party:'the design engineer',deadline:'end of day',task:'the BOM check'}],q:[
   ['What problem is mentioned?',['One part of the work still needs revision','The entire project was canceled','No files have been created','The customer refused the project'],0,'細節'],
   ['What should the receiver do today?',['Continue work that does not depend on the revision','Wait without doing anything','Delete the existing work','Contact a hotel'],0,'定位'],
   ['What will most likely happen by the stated deadline?',['A revised item will arrive','The project will be canceled','A new employee will start','The office will close'],0,'推論'],
   ['Why can work continue now?',['Some tasks are independent of the pending revision','All revisions are already complete','There is no deadline','The sender changed departments'],0,'推論']]},
 {pass:'SCHEDULE\n09:00 {a}\n10:00 {b}\n11:30 {c}\n12:30 {d}\n14:00 {e}\n15:30 {f}',vars:[
  {a:'Welcome briefing',b:'Factory tour',c:'Design review',d:'Lunch',e:'Reliability lab demonstration',f:'Closing discussion'},
  {a:'Registration',b:'Market outlook',c:'Customer panel',d:'Lunch',e:'Technology workshop',f:'Networking'},
  {a:'Safety briefing',b:'Line inspection',c:'Process review',d:'Lunch',e:'Supplier meeting',f:'Action summary'},
  {a:'Project update',b:'Prototype demo',c:'Cost review',d:'Lunch',e:'Risk workshop',f:'Executive wrap-up'}],q:[
   ['What activity starts at 10:00?',['The second listed activity','Lunch','The final activity','The 14:00 activity'],0,'定位'],
   ['What occurs immediately before lunch?',['The 11:30 activity','The 09:00 activity','The 15:30 activity','Nothing'],0,'時間序'],
   ['Which activity is scheduled at 14:00?',['The fifth listed activity','The first listed activity','Lunch','The closing activity'],0,'定位'],
   ['What is the document primarily used for?',['To show the order and timing of activities','To advertise a product price','To report a defect','To request reimbursement'],0,'主旨']]},
 {pass:'PRODUCT PAGE\n{product}\nFeature: {feature}\nCapacity: {capacity}\nWarranty: {warranty}\nDelivery: {delivery}\nPrice: {price}',vars:[
  {product:'TrailPro Backpack',feature:'Rain cover included',capacity:'28 L',warranty:'3 years',delivery:'Free over $60',price:'$74'},
  {product:'FlexDesk Standing Desk',feature:'Four memory presets',capacity:'80 kg maximum load',warranty:'5 years',delivery:'5–7 business days',price:'$529'},
  {product:'SecureVault Backup Plan',feature:'90-day file history',capacity:'5 TB shared storage',warranty:'Service SLA',delivery:'Online activation',price:'$49/month'},
  {product:'AirPure Office Filter',feature:'Auto air-quality mode',capacity:'70 m² rooms',warranty:'2 years',delivery:'3–5 business days',price:'$189'}],q:[
   ['What feature is included?',['The feature listed on the page','Free lifetime replacement','Unlimited capacity','A hotel stay'],0,'細節'],
   ['What does the capacity line describe?',['A product limit or size','A delivery date','A staff schedule','A payment method'],0,'細節'],
   ['What is indicated about warranty or service coverage?',['Coverage information is provided','There is no coverage','Coverage lasts one day','Coverage applies only to shipping'],0,'定位'],
   ['Who would most likely use this document?',['A customer comparing a product or service','A job applicant only','A customs officer only','A restaurant server'],0,'推論']]},
 {pass:'DOCUMENT 1 — EMAIL\nThe customer moved the {visit} from {oldDay} to {newDay}. They still want {keep}, but {request}.\n\nDOCUMENT 2 — REVISED SCHEDULE\n{newDay}\n09:30 Welcome\n10:00 {keep}\n12:00 Lunch\n13:30 {afterLunch}\n15:00 Closing review',vars:[
  {visit:'factory visit',oldDay:'Tuesday',newDay:'Wednesday',keep:'factory tour',request:'the design review should be after lunch',afterLunch:'Design review'},
  {visit:'supplier audit',oldDay:'Monday',newDay:'Thursday',keep:'process walk-through',request:'the record review should be after lunch',afterLunch:'Record review'},
  {visit:'customer workshop',oldDay:'Friday',newDay:'Monday',keep:'product demonstration',request:'the Q&A should be after lunch',afterLunch:'Q&A session'},
  {visit:'project review',oldDay:'Wednesday',newDay:'Friday',keep:'prototype demo',request:'the cost discussion should be after lunch',afterLunch:'Cost discussion'}],q:[
   ['Why was the schedule revised?',['The visitor changed the date','The site permanently closed','The event was canceled','The price increased'],0,'跨文件原因'],
   ['Which request is reflected in the revised schedule?',['A requested activity occurs after lunch','The 10:00 activity was removed','Lunch was canceled','The closing review moved to morning'],0,'跨文件對照'],
   ['What happens at 10:00?',['The activity the visitor wanted to keep','Lunch','The after-lunch review','The closing review'],0,'定位'],
   ['What can be inferred?',['The revised schedule accommodates the visitor’s main requests','The visitor rejected all activities','The event is now virtual','No schedule was changed'],0,'跨文件推論']]},
 {pass:'DOCUMENT 1 — INVOICE NOTE\nInvoice {order} shows {invoiceQty} units, but the receiving record shows {receivedQty}. Please confirm whether the balance is still in transit before payment.\n\nDOCUMENT 2 — CARRIER UPDATE\n{receivedQty} units delivered {delivered}. Remaining {balance} units delayed at {hub}; estimated delivery {eta}.',vars:[
  {order:'8842',invoiceQty:'120',receivedQty:'116',balance:'4',delivered:'Monday',hub:'regional hub',eta:'Wednesday'},
  {order:'9120',invoiceQty:'80',receivedQty:'76',balance:'4',delivered:'Tuesday',hub:'city depot',eta:'Thursday'},
  {order:'7731',invoiceQty:'200',receivedQty:'192',balance:'8',delivered:'Friday',hub:'airport warehouse',eta:'Monday'},
  {order:'6508',invoiceQty:'60',receivedQty:'58',balance:'2',delivered:'Wednesday',hub:'customs facility',eta:'Friday'}],q:[
   ['Why has payment not yet been approved?',['The received quantity does not match the invoice','The invoice has no company name','The carrier lost every unit','The order was canceled'],0,'跨文件原因'],
   ['What is true about the missing balance?',['It is still in transit','It was never ordered','It was returned by the customer','It is already paid'],0,'資料整合'],
   ['What will likely happen next?',['The remaining units are expected later','The invoice will be doubled','The order number will change','The customer must reorder all units'],0,'推論'],
   ['What information must Accounts Payable reconcile?',['Invoice quantity and delivery records','Employee attendance and payroll','Hotel dates and flights','Meeting rooms and menus'],0,'跨文件對照']]},
 {pass:'DOCUMENT 1 — PRODUCT NOTICE\n{model} units with serial numbers beginning {serial} may {problem}. A {solution} is available through the support app.\n\nDOCUMENT 2 — SUPPORT EMAIL\nMy serial is {serial}1284. It {symptom}. I already tried {test} with no improvement.',vars:[
  {model:'Model Q7 chargers',serial:'Q7M5',problem:'stop charging intermittently',solution:'firmware update',symptom:'disconnects every few minutes',test:'a different cable'},
  {model:'Model R2 docks',serial:'R2A8',problem:'lose network connection',solution:'driver update',symptom:'drops the connection randomly',test:'another Ethernet cable'},
  {model:'Model T9 sensors',serial:'T9C3',problem:'report delayed readings',solution:'software patch',symptom:'updates data several seconds late',test:'a second power supply'},
  {model:'Model P4 adapters',serial:'P4D6',problem:'restart unexpectedly',solution:'firmware patch',symptom:'restarts during use',test:'another outlet'}],q:[
   ['Why is the notice relevant to the customer?',['The serial prefix matches the affected range','The customer has a completely different model','The issue concerns shipping only','The notice is for employees'],0,'跨文件對照'],
   ['What problem does the customer report?',['A symptom consistent with the notice','A late invoice','A missing hotel booking','A salary issue'],0,'細節'],
   ['What solution is suggested?',['Install the listed update or patch','Buy a new building','Change the customer name','Cancel the support case'],0,'跨文件定位'],
   ['What can be inferred from the customer’s test?',['The tested accessory is less likely to be the root cause','The product works normally','The serial number is invalid','The notice is unrelated'],0,'推論']]},
 {pass:'DOCUMENT 1 — PURCHASE ORDER\nPO {po} — {qty} {item} — Required date: {date} — Finish: {finish}\n\nDOCUMENT 2 — SUPPLIER EMAIL\nWe can meet quantity, but {constraint}. Earliest confirmed ship date is {late}. If {alternative} is acceptable, {date} remains possible.\n\nDOCUMENT 3 — INTERNAL MEMO\nCustomer approval is required for {approval}. Production can tolerate {tolerance} without affecting final shipment.',vars:[
  {po:'4517',qty:'500',item:'housings',date:'Oct 20',finish:'black anodized',constraint:'the anodizing line is fully booked',late:'Oct 23',alternative:'natural aluminum',approval:'any visible finish change',tolerance:'a three-day housing delay'},
  {po:'3312',qty:'300',item:'brackets',date:'Nov 8',finish:'powder-coated gray',constraint:'the coating line is under maintenance',late:'Nov 11',alternative:'uncoated aluminum',approval:'any finish change',tolerance:'a three-day bracket delay'},
  {po:'7250',qty:'800',item:'covers',date:'Sep 15',finish:'matte black',constraint:'the paint booth is over capacity',late:'Sep 18',alternative:'standard black',approval:'a visible color change',tolerance:'a three-day cover delay'},
  {po:'6084',qty:'240',item:'frames',date:'Dec 2',finish:'brushed silver',constraint:'the brushing line is unavailable',late:'Dec 5',alternative:'mill finish',approval:'a cosmetic finish change',tolerance:'a three-day frame delay'}],q:[
   ['What prevents the supplier from meeting the original date exactly as specified?',['A finishing-process constraint','The ordered quantity is zero','The purchase order is missing','The customer canceled production'],0,'跨三文件原因'],
   ['What alternative could preserve the original date?',['Use the supplier’s alternative finish','Double the quantity','Cancel inspection','Change the customer name'],0,'跨文件對照'],
   ['Why might the company reject the alternative?',['Customer approval is required for the change','The alternative is not mentioned','Production cannot accept any delay','The supplier refuses the alternative'],0,'跨三文件推論'],
   ['What is the most practical option if approval is not obtained?',['Accept the short delay that production can tolerate','Cancel the entire project','Increase the order quantity','Ignore the purchase order'],0,'決策推論']]}
];
P7BASE.forEach((b,bi)=>b.vars.forEach((v,vi)=>{const passage=fill(b.pass,v),diff=bi>=4?950:(vi<2?800:900);b.q.forEach(([prompt,opts,a,cause])=>addQ(7,diff,prompt,opts,a,'需要定位、同義改寫或跨文件推論。',cause,{passage}))}));
