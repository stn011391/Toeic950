const P6BASE=[
 {title:'Conference Room Upgrade',intro:'Beginning next Monday, {room} will be unavailable while new {equipment} is installed. The work is expected to take {days}.',vars:[{room:'Conference Room B',equipment:'video-conferencing equipment',days:'three days'},{room:'Training Room 2',equipment:'display equipment',days:'two days'},{room:'Meeting Room East',equipment:'acoustic panels',days:'four days'}],items:[
  ['Employees who reserved the room will be contacted _____ with alternative locations.',['separate','separately','separation','separating'],1,'副詞修飾 contacted。','詞性'],
  ['We appreciate your _____ during this temporary disruption.',['patient','patience','patiently','patients'],1,'your 後需名詞 patience。','詞性'],
  ['The upgrade is expected to _____ remote meetings more reliable.',['make','making','made','makes'],0,'is expected to + 原形。','不定詞'],
  ['Which sentence best completes the text?',['Normal access will resume once the installation is finished.','The cafeteria menu changes every Friday.','Several employees received awards.','Parking permits expire in June.'],0,'需承接設備安裝與恢復使用。','篇章邏輯']]},
 {title:'System Maintenance',intro:'Our {system} will undergo scheduled maintenance from {start} until {end}. During this period, {service} will be unavailable.',vars:[{system:'customer portal',start:'11 P.M. Saturday',end:'3 A.M. Sunday',service:'online account access'},{system:'expense platform',start:'10 P.M. Friday',end:'1 A.M. Saturday',service:'claim submission'},{system:'supplier portal',start:'midnight',end:'4 A.M.',service:'order tracking'}],items:[
  ['Users are advised to complete urgent transactions _____.',['beforehand','before','formerly','earlierly'],0,'beforehand 作副詞表示事先。','字彙'],
  ['Service is expected to resume _____ the stated end time.',['at','on','in','for'],0,'時間點用 at。','介系詞'],
  ['The maintenance team will monitor the system _____ the upgrade.',['throughout','between','among','beside'],0,'throughout + 名詞表示全程。','介系詞'],
  ['Which sentence best completes the text?',['We apologize for any inconvenience this may cause.','The sales team exceeded its quota.','Please wear a name badge.','The new chairs are blue.'],0,'維修公告常以致歉承接。','篇章邏輯']]},
 {title:'Shipping Update',intro:'A {cause} has disrupted freight service at {place}. Several outbound orders may arrive {delay} later than originally estimated.',vars:[{cause:'severe storm',place:'the regional port',delay:'one to two days'},{cause:'customs-system outage',place:'the international hub',delay:'up to three days'},{cause:'labor shortage',place:'the city depot',delay:'about one day'}],items:[
  ['Customers _____ shipments are affected will receive an email.',['whose','who','whom','which'],0,'whose 修飾 shipments。','關係詞'],
  ['Our logistics team is working to minimize further _____.',['delay','delays','delayed','delaying'],1,'further 後接名詞複數 delays。','詞性'],
  ['No action is required _____ you receive a separate request from customer service.',['unless','because','although','despite'],0,'unless = 除非。','連接詞'],
  ['Which sentence best completes the text?',['Tracking information will be updated as new estimates become available.','The office moved to a new building.','Our website uses a different font.','A training room is on the fifth floor.'],0,'與延誤與追蹤資訊最相關。','篇章邏輯']]},
 {title:'Policy Update',intro:'Starting {date}, employees must submit {item} through the new {portal}. Paper forms will no longer be accepted except in limited circumstances.',vars:[{date:'September 1',item:'travel expenses',portal:'expense portal'},{date:'October 1',item:'training requests',portal:'learning portal'},{date:'November 15',item:'equipment requests',portal:'procurement portal'}],items:[
  ['Supporting documents should be uploaded _____ each request.',['with','during','among','beside'],0,'upload A with B。','介系詞'],
  ['Managers are responsible for _____ requests within five business days.',['review','reviewed','reviewing','reviews'],2,'介系詞 for 後接 V-ing。','動名詞'],
  ['Employees who need help may contact the support desk _____ extension 431.',['at','on','in','by'],0,'contact someone at extension...。','搭配'],
  ['Which sentence best completes the text?',['A short video tutorial is available on the intranet.','The parking lot was repainted.','The cafeteria opens at seven.','The legal team is recruiting.'],0,'承接新系統操作協助。','篇章邏輯']]}
];
P6BASE.forEach(b=>b.vars.forEach((v,vi)=>{const intro=`${b.title}\n${fill(b.intro,v)}`;b.items.forEach(([sent,opts,a,why,cause],j)=>addQ(6,[800,800,900,950][j],`(${j+1})`,opts,a,why,cause,{passage:`${intro}\n${sent}`}))}));
