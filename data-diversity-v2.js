// v1.4.0 True Diversity Pack
// Adds genuinely different low/mid-level structures, especially for the default Part 5 path.

const TDCTX=XCTX.slice(0,8);

const TDP2=[
[720,'Where did {person} put the {doc}?','On the shared drive under the project folder.','It was approved yesterday.','About {number}.','地點'],
[720,'When should we call {recipient}?','After the {event} ends.','At {location}.','The {dept} did.','時間'],
[720,'Who arranged the {service}?','The {dept} handled the booking.','It starts at {time}.','Near {place}.','人物'],
[720,'Why are we using {alt}?','The original option is temporarily unavailable.','At {time}.','For {number} people.','原因'],
[720,'Could {person} review the {doc} today?','I’ll ask whether she has time this afternoon.','The file has ten pages.','In {location}.','請求'],
[720,'Did the {supplier} send the {item}?','Only the first shipment has arrived.','At {place}.','It costs {price}.','確認'],
[720,'Which room was reserved for the {event}?','The invitation lists {location}.','At {time}.','The {dept} reserved it.','選擇'],
[720,'How often is the {system} backed up?','Every night after business hours.','It is on the server.','For two hours.','頻率'],
[720,'How many people will attend the {event}?','The latest list shows {number}.','At {time}.','Because the room changed.','數量'],
[720,'Why not send the {doc} electronically?','That would be faster for everyone.','At the front desk.','It was printed twice.','建議'],
[800,'How much time do we have before {deadline}?','A little over two hours.','In {location}.','The {supplier} called.','時間長度'],
[800,'Has {recipient} signed the {doc}?','Not yet; it is still under review.','At {time}.','The printer is downstairs.','完成狀態'],
[800,'Do you remember where the {item} was stored?','Check the cabinet beside {place}.','We ordered {number}.','On {day}.','間接問句'],
[800,'Would {alt} work as a temporary solution?','Yes, provided the customer accepts it.','At {time}.','The invoice was paid.','建議'],
[800,'May I update the {doc} myself?','Yes, but keep the revision history.','It is due {deadline}.','The office is upstairs.','許可'],
[800,'What led to {issue}?','The initial review points to {reason}.','At {place}.','The {dept} joined.','原因'],
[800,'Is anyone available to help with {task}?','{person} said she could assist after lunch.','At {time}.','The form is blue.','人員安排'],
[800,'You already told {recipient} about {issue}, didn’t you?','Yes, I sent an update this morning.','It costs {price}.','At {place}.','確認'],
[800,'How soon do we need a decision on {alt}?','Before {deadline}, according to the schedule.','At the supplier office.','The file is attached.','期限'],
[800,'Would it be better to postpone the {event}?','Only if the missing information cannot arrive in time.','At {location}.','About {number}.','判斷']
];
TDP2.forEach((r,ri)=>TDCTX.slice(0,4).forEach(c=>{const[d,stem,good,b1,b2,cause]=r,prompt=fill(stem,c),opts=[fill(good,c),fill(b1,c),fill(b2,c)],spoken=`${prompt} A. ${opts[0]} B. ${opts[1]} C. ${opts[2]}`;addQ(2,d,prompt,opts,0,`最自然的回應是：${opts[0]}`,cause,{spoken,transcript:spoken,family:`TD-P2-${ri}`})}));

const TDP5=[
[720,'{person} will send the {doc} _____ lunch.',['after','among','beside','through'],0,'after + 名詞表示「在…之後」。','介系詞'],
[720,'The {item} was delivered _____ than expected.',['early','earlier','earliest','more early'],1,'than 前使用比較級 earlier。','比較級'],
[720,'Please make _____ that {recipient} receives the {doc}.',['sure','surely','sureness','assure'],0,'make sure that 為固定用法。','固定搭配'],
[720,'The {dept} has _____ the meeting room for {day}.',['reserve','reserved','reserving','reservation'],1,'has + 過去分詞。','現在完成式'],
[720,'{person} is one of the employees who _____ the {system} daily.',['use','uses','using','used to'],0,'who 的先行詞 employees 為複數。','主謂一致'],
[720,'The {doc} is available _____ both printed and digital formats.',['in','at','on','by'],0,'available in a format。','介系詞'],
[720,'We need _____ copies of the {doc} for the {event}.',['additional','addition','additionally','add'],0,'修飾 copies 需形容詞 additional。','詞性'],
[720,'The {supplier} agreed _____ the {item} by {deadline}.',['deliver','to deliver','delivering','delivered'],1,'agree to + V。','不定詞'],
[720,'Please return the badge _____ leaving {place}.',['before','among','beside','through'],0,'before + V-ing。','時間連接'],
[720,'The {event} was canceled _____ the speaker became ill.',['because','because of','despite','during'],0,'because 後接完整子句。','連接詞'],
[720,'{person} gave us _____ useful advice about the {issue}.',['some','many','few','several of'],0,'advice 不可數，用 some。','不可數名詞'],
[720,'The new process is much _____ to follow.',['simple','simpler','simplest','simply'],1,'much 修飾比較級。','比較級'],
[720,'The {dept} will meet _____ Monday morning.',['on','in','at','by of'],0,'星期與 morning 前用 on。','介系詞'],
[720,'Employees must wear badges _____ they are inside {location}.',['while','during','despite','because of'],0,'while 後接子句。','連接詞'],
[720,'The {doc} needs to be _____ before it is distributed.',['check','checked','checking','checks'],1,'need to be + p.p.。','被動語態'],
[720,'{person} speaks English _____ enough to lead the {event}.',['fluent','fluently','fluency','more fluent'],1,'修飾 speaks 用副詞。','副詞'],
[720,'The office will remain open _____ 7 P.M. today.',['until','since','among','through of'],0,'until + 時間點。','時間介系詞'],
[720,'Neither of the two proposals _____ within budget.',['is','are','be','being'],0,'Neither of + 複數名詞，動詞通常單數。','主謂一致'],
[720,'The {item} arrived, but _____ packaging was damaged.',['its','it’s','their','it'],0,'所有格代名詞 its。','代名詞'],
[720,'Please let me know _____ you need another copy.',['if','despite','during','because of'],0,'if 引導條件。','條件句'],
[720,'We were pleased _____ the test results.',['with','to','at of','among'],0,'be pleased with + 名詞。','固定搭配'],
[720,'The {dept} plans to hire _____ employees next quarter.',['several','much','another of','less'],0,'employees 可數複數，用 several。','量詞'],
[720,'{person} has worked here _____ 2022.',['since','for','during','from of'],0,'since + 時間點。','現在完成式'],
[720,'The {doc} was sent to {recipient} _____ email.',['by','on','at','with of'],0,'by email 為固定用法。','固定搭配'],
[720,'There are _____ chairs for everyone attending the {event}.',['enough','enough of','too much','a little'],0,'enough + 複數名詞。','量詞'],
[720,'The manager asked {person} _____ the schedule.',['update','to update','updating','updated'],1,'ask someone to + V。','不定詞'],
[720,'The report is _____ complete; only one chart is missing.',['almost','most','mostly of','near'],0,'almost 修飾形容詞 complete。','副詞'],
[720,'The {supplier} sent the wrong model, _____ we requested a replacement.',['so','because of','despite','unless'],0,'so 連接因果子句。','連接詞'],
[720,'Please place the signed form _____ my desk.',['on','in','at','to of'],0,'on the desk。','介系詞'],
[720,'The {event} starts at nine and _____ at noon.',['ends','end','ending','ended it'],0,'與 starts 並列用第三人稱單數 ends。','主謂一致'],
[800,'The {dept} will not proceed _____ it receives written approval.',['until','during','beside','because of'],0,'not...until 表示直到…才。','時間連接'],
[800,'{person} is expected _____ the {doc} before {deadline}.',['submit','to submit','submitting','submitted'],1,'be expected to + V。','不定詞'],
[800,'The company offers training to employees _____ roles require the {system}.',['whose','who','whom','which'],0,'whose 表所有關係。','關係代名詞'],
[800,'The {item} should be inspected immediately _____ arrival.',['upon','among','beside','between'],0,'upon arrival = 抵達時。','固定搭配'],
[800,'We chose {alt} because it was the _____ expensive option.',['less','least','little','fewest'],1,'三者以上比較用最高級 least。','最高級'],
[800,'{person} will attend the {event} _____ she finishes the audit first.',['provided','despite','during','because of'],0,'provided (that) 表條件。','條件句'],
[800,'The {doc} explains how the {system} _____ operated.',['should be','should','be should','should being'],0,'被動：should be operated。','情態動詞/被動'],
[800,'Any employee _____ wishes to join must register by {deadline}.',['who','whose','whom','which person'],0,'who 作關係子句主詞。','關係代名詞'],
[800,'The {supplier} apologized for _____ the shipment late.',['send','sending','sent','to sent'],1,'for 後接 V-ing。','動名詞'],
[800,'The meeting ended earlier than we had _____.',['expect','expected','expecting','expectation'],1,'had + p.p.。','過去完成式'],
[800,'The {dept} is considering _____ {alt} for the next phase.',['adopt','adopting','adopted','to adopted'],1,'consider + V-ing。','動名詞'],
[800,'{person} asked whether the {doc} _____ already been approved.',['has','had','have','having'],1,'過去式 asked 後回述更早完成，用 had been。','間接引語'],
[800,'The {item} is similar _____ the model we tested last year.',['to','with','at','for of'],0,'be similar to。','固定搭配'],
[800,'The {event} attracted _____ participants than expected.',['more','much','most','many of'],0,'than 前用比較級 more。','比較級'],
[800,'The manager suggested _____ the decision until Friday.',['delay','delaying','delayed','to delayed'],1,'suggest + V-ing。','動名詞'],
[800,'The {doc} must be kept in a place _____ only authorized staff can access it.',['where','which','who','whose'],0,'where 引導地點關係副詞子句。','關係副詞'],
[800,'{person} completed the task without _____ any assistance.',['request','requesting','requested','to request'],1,'without 後接 V-ing。','動名詞'],
[800,'The {dept} has not decided _____ to renew the contract.',['whether','despite','during','because of'],0,'whether to + V。','名詞子句'],
[800,'The {item} will be replaced at no extra cost _____ it is still under warranty.',['if','despite','during','because of'],0,'if 引導條件。','條件句'],
[800,'The revised schedule allows us _____ the review on time.',['finish','to finish','finishing','finished'],1,'allow someone to + V。','不定詞'],
[800,'{person} is familiar _____ the requirements in the {doc}.',['with','to','for','among'],0,'be familiar with。','固定搭配'],
[800,'The {supplier} provided the information we had _____.',['request','requested','requesting','requests'],1,'had + p.p.。','過去完成式'],
[800,'The {dept} decided to postpone the launch rather than _____ quality.',['compromise','compromising','compromised','to compromised'],0,'rather than 與 to postpone 對應原形 compromise。','平行結構'],
[800,'The {doc} includes a chart _____ summarizes the latest results.',['that','what','whose','where'],0,'that 作關係子句主詞。','關係代名詞'],
[800,'The shipment arrived _____ time for the afternoon inspection.',['in','on','at','by of'],0,'in time for = 及時趕上。','固定搭配'],
[800,'{person} is the engineer _____ recommendation was accepted.',['whose','who','whom','which'],0,'whose + 名詞表示所有。','關係代名詞'],
[800,'The {dept} will review the proposal again _____ making a final decision.',['before','among','despite','because of'],0,'before + V-ing。','時間連接'],
[800,'The {system} is easier to use than it _____ before the update.',['was','is being','has','were being'],0,'than 子句承接過去狀態用 was。','比較結構'],
[800,'We can begin production as soon as the {supplier} _____ the samples.',['delivers','will deliver','delivered yesterday','delivering'],0,'時間子句表示未來用現在式。','時間子句'],
[800,'The {event} was so useful _____ several teams requested a second session.',['that','than','as','which'],0,'so...that 結果句。','結果子句']
];
TDP5.forEach((r,ri)=>TDCTX.slice(0,4).forEach(c=>{const[d,stem,opts,a,why,cause]=r;addQ(5,d,fill(stem,c),opts,a,why,cause,{family:`TD-P5-${ri}`})}));

const TD3=[
['A prototype review uncovers a missing drawing note and the team assigns a correction before release.','document'],['A customer changes a meeting date and the coordinator checks room availability before resending invitations.','schedule'],['A supplier offers a partial shipment and procurement evaluates whether production can start with it.','schedule'],['A test result exceeds tolerance and engineers compare the setup with the previous approved method.','test'],['A software update breaks one report and IT asks for screenshots and reproduction steps.','issue'],['A hotel booking for a business trip is changed because the conference venue moved.','schedule'],['A purchase request exceeds budget and the manager asks for a cheaper equivalent.','cost'],['A customer complaint is traced to packaging damage and logistics prepares a containment action.','issue'],['An audit finds an expired training record and HR schedules a make-up session.','document'],['A machine is overheating and maintenance plans an inspection during the next line stop.','test'],['A sales proposal is missing an optional service and the account team revises the quotation.','document'],['A customs delay threatens a delivery date and logistics considers air freight for the urgent balance.','cost'],['A conference presenter cancels and the organizer asks another specialist to cover the session.','schedule'],['A finance analyst finds duplicate charges and requests corrected receipts before reimbursement.','document'],['A laboratory booking conflicts with another project and the engineer negotiates a later test slot.','schedule'],['A customer asks for an earlier prototype and the project manager reviews which activities can overlap.','issue'],['A production lot is placed on hold after a measurement discrepancy and quality requests reinspection.','test'],['A contract clause conflicts with company policy and legal proposes alternate wording.','document'],['A service center has a growing queue and the supervisor temporarily reassigns staff.','issue'],['A training session is full and HR opens an additional class for wait-listed employees.','schedule']
];
TD3.forEach((r,ri)=>TDCTX.slice(0,4).forEach((c,ci)=>{const spoken=`Woman: We have a new issue with ${c.item}. Man: ${r[0]} Woman: Please update ${c.recipient} before ${c.deadline}.`;const qs=[['What are the speakers mainly discussing?',['A work issue that requires coordination','A restaurant reservation','A personal vacation','A salary review'],0,'主旨'],['What will most likely happen next?',['Someone will take the stated follow-up action','The company will close permanently','The speakers will ignore the issue','A meal will be ordered'],0,'下一步'],['Who will probably receive an update?',[c.recipient,'A tourist','A bank teller','A restaurant server'],0,'細節']];qs.forEach(([p,o,a,z])=>addQ(3,ci<2?800:900,p,o,a,'根據對話內容判斷。',z,{spoken,transcript:spoken,family:`TD-P3-${ri}`}))}));

const TD4=['facility closure','system outage','delivery delay','training reminder','visitor procedure','parking change','maintenance window','customer-service update','registration deadline','safety notice','product recall','schedule revision','weather disruption','inventory count','office relocation','policy reminder','security alert','equipment inspection','event capacity change','network migration'];
TD4.forEach((topic,ri)=>TDCTX.slice(0,4).forEach((c,ci)=>{const spoken=`Attention everyone. This is an update about the ${topic}. Because ${c.reason}, the ${c.dept} will make a temporary change on ${c.day}. Please use ${c.alt} and contact ${c.recipient} if the change affects your work. Normal arrangements are expected by ${c.deadline}.`;const qs=[['What is the main purpose of the announcement?',[`To explain a ${topic}`,'To advertise a vacation','To announce a salary increase','To describe a restaurant'],0,'主旨'],['Why is the temporary change necessary?',[c.reason,'A new cafeteria menu','A holiday bonus','A product color change'],0,'原因'],['What should listeners do if they are affected?',[`Contact ${c.recipient}`,'Ignore the announcement','Cancel all future work','Leave the country'],0,'細節']];qs.forEach(([p,o,a,z])=>addQ(4,ci<2?800:900,p,o,a,'根據短講主旨、原因與指示判斷。',z,{spoken,transcript:spoken,family:`TD-P4-${ri}`}))}));

const legacyFamilyRanges={2:{count:60,size:3,prefix:'L-P2'},3:{count:36,size:9,prefix:'L-P3'},4:{count:36,size:9,prefix:'L-P4'},5:{count:224,size:8,prefix:'L-P5'},6:{count:48,size:12,prefix:'L-P6'},7:{count:128,size:16,prefix:'L-P7'}};
for(const [p,cfg] of Object.entries(legacyFamilyRanges)){(QUESTIONS[p]||[]).slice(0,cfg.count).forEach((q,i)=>{if(!q.family)q.family=`${cfg.prefix}-${Math.floor(i/cfg.size)}`})}
