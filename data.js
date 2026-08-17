const PARTS=[
 {n:1,name:'Photographs',zh:'照片描述',focus:'快速掃描人物、動作、位置',tips:['先看主體與動作','注意被動語態與位置介系詞','不要因單字相同就選']},
 {n:2,name:'Question–Response',zh:'應答問題',focus:'第一個疑問詞 + 語意反應',tips:['Who/When/Where 開頭立刻分類','防同音字干擾','間接回答很常見']},
 {n:3,name:'Conversations',zh:'多人對話',focus:'人物關係、目的、下一步',tips:['播音前先掃題目','抓轉折與下一步','熟悉同義改寫']},
 {n:4,name:'Talks',zh:'短講',focus:'主旨、細節、公告目的',tips:['辨識場景：公告/語音/簡報','記錄時間地點與動作','不要卡在單一陌生字']},
 {n:5,name:'Incomplete Sentences',zh:'單句填空',focus:'詞性、文法、搭配、速度',tips:['先判斷考詞性還是語意','文法題力求快速完成','建立固定搭配詞庫']},
 {n:6,name:'Text Completion',zh:'篇章填空',focus:'上下文、代名詞、句子插入',tips:['不要只看空格前後','留意時態與指涉','句子插入看邏輯連接']},
 {n:7,name:'Reading Comprehension',zh:'閱讀理解',focus:'定位、同義改寫、時間管理',tips:['題目先抓關鍵字','答案常是改寫不是原字','雙/三篇先確認文件關係']}
];

const VOCAB=[
 {w:'allocate',pos:'v.',zh:'分配',col:'allocate resources / allocate a budget',ex:'The manager allocated additional resources to the project.',exzh:'經理為該專案分配了額外資源。'},
 {w:'mandatory',pos:'adj.',zh:'強制的；必須的',col:'mandatory training / mandatory requirement',ex:'Safety training is mandatory for all new employees.',exzh:'所有新進員工都必須接受安全訓練。'},
 {w:'tentative',pos:'adj.',zh:'暫定的',col:'tentative schedule / tentative agreement',ex:'The tentative launch date is September 15.',exzh:'暫定上市日期為 9 月 15 日。'},
 {w:'reimbursement',pos:'n.',zh:'報銷；償還',col:'travel reimbursement / request reimbursement',ex:'Please submit the receipt for reimbursement.',exzh:'請提交收據以辦理報銷。'},
 {w:'eligible',pos:'adj.',zh:'符合資格的',col:'eligible for / eligible employee',ex:'Employees are eligible for the bonus after six months.',exzh:'員工滿六個月後可取得獎金資格。'},
 {w:'adjacent',pos:'adj.',zh:'鄰近的',col:'adjacent to / adjacent building',ex:'The conference room is adjacent to the lobby.',exzh:'會議室就在大廳旁邊。'},
 {w:'facilitate',pos:'v.',zh:'促進；使便利',col:'facilitate communication / facilitate a meeting',ex:'The new system will facilitate communication across teams.',exzh:'新系統將促進跨團隊溝通。'},
 {w:'substantial',pos:'adj.',zh:'大量的；重大的',col:'substantial increase / substantial evidence',ex:'The company reported a substantial increase in overseas sales.',exzh:'公司報告海外銷售大幅增加。'},
 {w:'compliance',pos:'n.',zh:'遵循；合規',col:'in compliance with / regulatory compliance',ex:'All products must be in compliance with safety regulations.',exzh:'所有產品都必須符合安全法規。'},
 {w:'retain',pos:'v.',zh:'保留；留住',col:'retain records / retain employees',ex:'Please retain a copy of the document for your records.',exzh:'請保留一份文件副本以供存查。'},
 {w:'promptly',pos:'adv.',zh:'迅速地',col:'respond promptly / promptly notify',ex:'Customers will be notified promptly of any schedule changes.',exzh:'若時程有任何變更，將迅速通知客戶。'},
 {w:'premises',pos:'n.',zh:'營業場所；建築物範圍',col:'on the premises / company premises',ex:'Visitors must wear identification badges on the premises.',exzh:'訪客在公司場所內必須佩戴識別證。'},
 {w:'initiative',pos:'n.',zh:'計畫；倡議；主動性',col:'launch an initiative / take the initiative',ex:'The company launched an energy-saving initiative.',exzh:'公司推出了一項節能計畫。'},
 {w:'accommodate',pos:'v.',zh:'容納；配合需求',col:'accommodate guests / accommodate a request',ex:'We can accommodate up to 120 guests in the main hall.',exzh:'主廳最多可容納 120 位賓客。'},
 {w:'approximately',pos:'adv.',zh:'大約',col:'approximately 20 minutes / approximately equal',ex:'Delivery will take approximately three business days.',exzh:'配送大約需要三個工作天。'},
 {w:'proceed',pos:'v.',zh:'繼續進行',col:'proceed with / proceed to',ex:'We will proceed with production after final approval.',exzh:'最終核准後我們將繼續生產。'},
 {w:'defective',pos:'adj.',zh:'有缺陷的',col:'defective product / defective component',ex:'Defective items may be returned within thirty days.',exzh:'瑕疵商品可於三十天內退回。'},
 {w:'consistently',pos:'adv.',zh:'持續一致地',col:'perform consistently / consistently high',ex:'The branch has consistently exceeded its sales target.',exzh:'該分公司持續超越銷售目標。'},
 {w:'substitute',pos:'n./v.',zh:'替代品；替代',col:'substitute for / substitute ingredient',ex:'A digital copy may be used as a substitute for the printed form.',exzh:'電子副本可作為紙本表格的替代。'},
 {w:'outstanding',pos:'adj.',zh:'未完成的；傑出的',col:'outstanding balance / outstanding performance',ex:'Please pay the outstanding balance by Friday.',exzh:'請於星期五前支付未清餘額。'}
];

const QUESTIONS={
  2:[
   {prompt:'Where should I leave these packages?',spoken:'Where should I leave these packages?',opts:['By the front desk.','They were delivered yesterday.','About five kilograms.'],a:0,why:'Where 問地點；By the front desk 是直接地點回答。',cause:'聽力反應'},
   {prompt:'Didn’t Maria attend the budget meeting?',spoken:'Didn’t Maria attend the budget meeting?',opts:['No, she was meeting a client.','The budget was approved.','In the large conference room.'],a:0,why:'否定問句仍依語意回答；No, she was meeting a client. 說明她沒有出席。',cause:'聽力反應'},
   {prompt:'When will the replacement parts arrive?',spoken:'When will the replacement parts arrive?',opts:['At the loading dock.','By Thursday afternoon.','We replaced three parts.'],a:1,why:'When 問時間；By Thursday afternoon 符合。',cause:'疑問詞'},
   {prompt:'Who is responsible for updating the website?',spoken:'Who is responsible for updating the website?',opts:['The marketing team is.','It was updated last week.','On the home page.'],a:0,why:'Who 問人/單位；marketing team 符合。',cause:'疑問詞'},
   {prompt:'Could you send me the revised schedule?',spoken:'Could you send me the revised schedule?',opts:['Sure, I’ll email it this afternoon.','The schedule was delayed.','At three o’clock.'],a:0,why:'Could you 是請求；最佳回答是承諾執行。',cause:'語意反應'},
   {prompt:'Why was the delivery postponed?',spoken:'Why was the delivery postponed?',opts:['Because of severe weather.','At the rear entrance.','Two delivery trucks.'],a:0,why:'Why 問原因；Because of... 正確。',cause:'疑問詞'}
  ],
  3:[
   {spoken:'Woman: I just received a message from the supplier. The prototype parts will arrive on Wednesday instead of Monday. Man: That may affect our validation test. I’ll ask the lab whether we can move our booking to Friday. Woman: Good idea. Please let the project team know once the lab confirms.',prompt:'What problem are the speakers discussing?',opts:['A delayed shipment','An incorrect invoice','A missing test report','A damaged machine'],a:0,why:'供應商零件延後抵達，是 shipment delay。',cause:'主旨'},
   {spoken:'Woman: I just received a message from the supplier. The prototype parts will arrive on Wednesday instead of Monday. Man: That may affect our validation test. I’ll ask the lab whether we can move our booking to Friday. Woman: Good idea. Please let the project team know once the lab confirms.',prompt:'What will the man probably do next?',opts:['Cancel the project','Contact the laboratory','Order more parts','Prepare an invoice'],a:1,why:'男方明確說會詢問實驗室是否能改到週五。',cause:'下一步'},
   {spoken:'Man: Welcome to the Riverside Hotel. Are you checking in? Woman: Yes, but I’m a little early. My reservation is under Chen. Man: Your room is ready, but housekeeping is still checking the minibar. You can leave your luggage with us and have coffee in the lobby. Woman: Great. I’ll do that.',prompt:'Where most likely are the speakers?',opts:['At a hotel','At a train station','At a restaurant kitchen','At an office'],a:0,why:'checking in、reservation、room、luggage 都指向旅館。',cause:'場景'},
   {spoken:'Man: Welcome to the Riverside Hotel. Are you checking in? Woman: Yes, but I’m a little early. My reservation is under Chen. Man: Your room is ready, but housekeeping is still checking the minibar. You can leave your luggage with us and have coffee in the lobby. Woman: Great. I’ll do that.',prompt:'What will the woman probably do?',opts:['Wait in the lobby','Cancel her reservation','Call housekeeping','Leave the hotel'],a:0,why:'她同意先寄放行李並在 lobby 喝咖啡。',cause:'下一步'}
  ],
  4:[
   {spoken:'Attention employees. The east parking lot will be closed this Thursday for resurfacing. Please use the north parking area or take the company shuttle from Green Street Station. The east lot will reopen Friday morning. We apologize for the inconvenience.',prompt:'What is the purpose of the announcement?',opts:['To explain a parking change','To introduce a new employee','To advertise a station','To change office hours'],a:0,why:'公告主旨是東側停車場暫時關閉以及替代方案。',cause:'主旨'},
   {spoken:'Attention employees. The east parking lot will be closed this Thursday for resurfacing. Please use the north parking area or take the company shuttle from Green Street Station. The east lot will reopen Friday morning. We apologize for the inconvenience.',prompt:'When will the east lot reopen?',opts:['Thursday morning','Thursday afternoon','Friday morning','Friday afternoon'],a:2,why:'短講明確說 reopen Friday morning。',cause:'細節'},
   {spoken:'Thank you for calling BrightLine Electronics. Our service center is currently closed. Regular hours are from nine A.M. to six P.M., Monday through Saturday. To check the status of a repair, visit our website and enter your service number. For all other requests, please leave a message after the tone.',prompt:'How can a customer check a repair status?',opts:['By visiting a website','By calling a technician','By sending a fax','By going to a warehouse'],a:0,why:'語音訊息指示到網站輸入 service number。',cause:'細節'}
  ],
  5:[
   {prompt:'All employees are required to complete the security training _____ Friday.',opts:['by','among','during','beside'],a:0,why:'by + 時間點 = 截止於某時間之前。',cause:'介系詞'},
   {prompt:'The engineering team responded _____ to the customer’s request for additional test data.',opts:['prompt','promptly','promptness','prompting'],a:1,why:'修飾 responded（動詞）需要副詞 promptly。',cause:'詞性'},
   {prompt:'Ms. Patel will lead the meeting in Mr. Owen’s _____ while he is visiting the Singapore office.',opts:['absent','absence','absently','absences'],a:1,why:'in someone’s absence 是固定用法，需要名詞。',cause:'詞性/搭配'},
   {prompt:'The new software is expected to make the approval process more _____.',opts:['efficiency','efficient','efficiently','efficiencies'],a:1,why:'make + O + 形容詞補語，因此用 efficient。',cause:'詞性'},
   {prompt:'Please contact the purchasing department _____ you have any questions about the invoice.',opts:['if','unless','despite','because of'],a:0,why:'if 引導條件子句；若有問題，請聯絡採購。',cause:'連接詞'},
   {prompt:'The factory has _____ reduced its energy consumption over the past three years.',opts:['signify','significant','significantly','significance'],a:2,why:'修飾 reduced 需要副詞 significantly。',cause:'詞性'},
   {prompt:'Customers who register online will receive _____ updates about their orders.',opts:['period','periodic','periodically','periods'],a:1,why:'修飾名詞 updates 需要形容詞 periodic。',cause:'詞性'},
   {prompt:'Neither the manager nor the assistants _____ available to attend the morning session.',opts:['was','were','be','been'],a:1,why:'Neither A nor B 動詞通常就近與 B 一致；assistants 為複數，因此 were。',cause:'主謂一致'},
   {prompt:'The contract will be renewed _____ both parties agree to the revised terms.',opts:['provided that','in spite of','so that','due to'],a:0,why:'provided that = 只要/如果，符合條件語意。',cause:'連接詞'},
   {prompt:'The report contains information _____ from interviews with more than 200 customers.',opts:['collect','collected','collecting','collection'],a:1,why:'information 與 collect 是被動關係，用過去分詞 collected 作後位修飾。',cause:'分詞'}
  ],
  6:[
   {passage:'To: All Staff\nSubject: Conference Room Upgrade\nBeginning next Monday, Conference Room B will be unavailable while new video-conferencing equipment is installed. The work is expected to take three days. Employees who have already reserved the room will be contacted _____ (1) with alternative locations. We appreciate your _____ (2) during this temporary disruption.',prompt:'(1)',opts:['separate','separately','separation','separating'],a:1,why:'修飾 will be contacted，需副詞 separately。',cause:'詞性'},
   {passage:'To: All Staff\nSubject: Conference Room Upgrade\nBeginning next Monday, Conference Room B will be unavailable while new video-conferencing equipment is installed. The work is expected to take three days. Employees who have already reserved the room will be contacted separately with alternative locations. We appreciate your _____ (2) during this temporary disruption.',prompt:'(2)',opts:['patient','patience','patiently','patients'],a:1,why:'your 後面要接名詞 patience。',cause:'詞性'},
   {passage:'Dear Ms. Lopez,\nThank you for your interest in our leadership workshop. Due to strong demand, the September session is now full. _____ We have added an additional session on October 8, and registration is now open.',prompt:'Which sentence best completes the text?',opts:['However, we are pleased to offer another date.','The building was renovated last year.','Please submit your travel expenses.','The workshop materials were printed locally.'],a:0,why:'前句說滿額，後句說新增場次，需要 However 轉折並承接另一日期。',cause:'篇章邏輯'}
  ],
  7:[
   {passage:'NOTICE\nThe Harbor Café will close at 3:00 P.M. on August 21 for a private event. Takeout orders placed through our mobile app will be accepted until 2:30 P.M. Regular business hours will resume the following morning. Customers with questions about existing catering orders should call 555-0184.',prompt:'Why will the café close early?',opts:['For a private event','For equipment repair','For staff training','For a public holiday'],a:0,why:'第一句直接指出 for a private event。',cause:'定位'},
   {passage:'NOTICE\nThe Harbor Café will close at 3:00 P.M. on August 21 for a private event. Takeout orders placed through our mobile app will be accepted until 2:30 P.M. Regular business hours will resume the following morning. Customers with questions about existing catering orders should call 555-0184.',prompt:'What is indicated about takeout orders?',opts:['They can be placed until 2:30 P.M.','They will receive a discount.','They must be picked up the next day.','They can only be ordered by phone.'],a:0,why:'公告明確寫 mobile app takeout orders accepted until 2:30 P.M.。',cause:'細節'},
   {passage:'From: Olivia Park\nTo: Daniel Wu\nSubject: Product Photos\nHi Daniel,\nThe photographer sent the final images this morning. Most are ready for the catalog, but the photos of the blue model need a small color correction. I have asked the studio to send revised files by tomorrow noon. Please continue working on the text layout today; you can insert the corrected images once they arrive.\nOlivia',prompt:'What does Olivia ask Daniel to do today?',opts:['Continue working on the text layout','Contact the photographer','Correct the image colors','Print the final catalog'],a:0,why:'信中直接說 Please continue working on the text layout today。',cause:'定位'},
   {passage:'From: Olivia Park\nTo: Daniel Wu\nSubject: Product Photos\nHi Daniel,\nThe photographer sent the final images this morning. Most are ready for the catalog, but the photos of the blue model need a small color correction. I have asked the studio to send revised files by tomorrow noon. Please continue working on the text layout today; you can insert the corrected images once they arrive.\nOlivia',prompt:'What will most likely happen by tomorrow noon?',opts:['Revised images will arrive','The catalog will be mailed','Daniel will visit the studio','A new blue model will be produced'],a:0,why:'Olivia 已要求 studio 在 tomorrow noon 前寄 revised files。',cause:'推論/下一步'}
  ]
};

const DIAG=[
 {part:2,...QUESTIONS[2][0]},{part:2,...QUESTIONS[2][1]},
 {part:3,...QUESTIONS[3][0]},{part:3,...QUESTIONS[3][1]},
 {part:4,...QUESTIONS[4][0]},{part:4,...QUESTIONS[4][1]},
 {part:5,...QUESTIONS[5][0]},{part:5,...QUESTIONS[5][1]},
 {part:6,...QUESTIONS[6][0]},{part:6,...QUESTIONS[6][2]},
 {part:7,...QUESTIONS[7][0]},{part:7,...QUESTIONS[7][1]},
 {part:5,...QUESTIONS[5][7]},{part:7,...QUESTIONS[7][3]}
];
