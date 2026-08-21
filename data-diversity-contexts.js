// v1.5.0 context expansion
// The v1.4 diversity pack used only the first four TDCTX contexts. Add contexts 5–8
// so different structures do not keep recycling the same departments, documents and suppliers.
const TD_EXTRA=TDCTX.slice(4,8);

TDP2.forEach((r,ri)=>TD_EXTRA.forEach(c=>{const[d,stem,good,b1,b2,cause]=r,prompt=fill(stem,c),opts=[fill(good,c),fill(b1,c),fill(b2,c)],spoken=`${prompt} A. ${opts[0]} B. ${opts[1]} C. ${opts[2]}`;addQ(2,d,prompt,opts,0,`最自然的回應是：${opts[0]}`,cause,{spoken,transcript:spoken,family:`TD-P2-${ri}`})}));

TDP5.forEach((r,ri)=>TD_EXTRA.forEach(c=>{const[d,stem,opts,a,why,cause]=r;addQ(5,d,fill(stem,c),opts,a,why,cause,{family:`TD-P5-${ri}`})}));

TD3.forEach((r,ri)=>TD_EXTRA.forEach((c,ci)=>{const spoken=`Woman: We have a new issue with ${c.item}. Man: ${r[0]} Woman: Please update ${c.recipient} before ${c.deadline}.`;const qs=[['What are the speakers mainly discussing?',['A work issue that requires coordination','A restaurant reservation','A personal vacation','A salary review'],0,'主旨'],['What will most likely happen next?',['Someone will take the stated follow-up action','The company will close permanently','The speakers will ignore the issue','A meal will be ordered'],0,'下一步'],['Who will probably receive an update?',[c.recipient,'A tourist','A bank teller','A restaurant server'],0,'細節']];qs.forEach(([p,o,a,z])=>addQ(3,ci<2?800:900,p,o,a,'根據對話內容判斷。',z,{spoken,transcript:spoken,family:`TD-P3-${ri}`}))}));

TD4.forEach((topic,ri)=>TD_EXTRA.forEach((c,ci)=>{const spoken=`Attention everyone. This is an update about the ${topic}. Because ${c.reason}, the ${c.dept} will make a temporary change on ${c.day}. Please use ${c.alt} and contact ${c.recipient} if the change affects your work. Normal arrangements are expected by ${c.deadline}.`;const qs=[['What is the main purpose of the announcement?',[`To explain a ${topic}`,'To advertise a vacation','To announce a salary increase','To describe a restaurant'],0,'主旨'],['Why is the temporary change necessary?',[c.reason,'A new cafeteria menu','A holiday bonus','A product color change'],0,'原因'],['What should listeners do if they are affected?',[`Contact ${c.recipient}`,'Ignore the announcement','Cancel all future work','Leave the country'],0,'細節']];qs.forEach(([p,o,a,z])=>addQ(4,ci<2?800:900,p,o,a,'根據短講主旨、原因與指示判斷。',z,{spoken,transcript:spoken,family:`TD-P4-${ri}`}))}));
