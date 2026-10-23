export const categories = ['Technical', 'Behavioral', 'Situational', 'Role-specific'];
const str = {type:'string'};
const object = properties => ({type:'object',properties,required:Object.keys(properties),additionalProperties:false});
export const planSchema = object({role:str,summary:str,skills:{type:'array',items:str},questions:{type:'array',items:object({category:{type:'string',enum:categories},difficulty:{type:'string',enum:['Easy','Medium','Hard']},question:str,why:str,answerGuide:str})}});
export const feedbackSchema = object({score:{type:'integer',minimum:0,maximum:10},strengths:str,improvements:str,sampleAnswer:str});
export function validateInput(body) {
 if(typeof body.jd !== 'string' || body.jd.trim().length < 80 || body.jd.length > 16000) throw new Error('Paste a job description between 80 and 16,000 characters.');
 if(!['Junior','Mid-level','Senior','Lead'].includes(body.level)) throw new Error('Choose a valid experience level.');
 if(![8,12,16].includes(body.count)) throw new Error('Choose 8, 12, or 16 questions.');
 return {...body,jd:body.jd.trim()};
}
export function demoPlan({jd,level,count}) {
 const known=['JavaScript','TypeScript','React','Node.js','Python','SQL','AWS','Azure','Docker','Kubernetes','Java','Figma','Excel','SEO','Sales','Marketing','Security','Communication','Leadership','Project management','Customer service'];
 const skills=known.filter(s=>new RegExp(`(?<![a-z0-9])${s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(?![a-z0-9])`,'i').test(jd));
 const lines=jd.split('\n').map(s=>s.trim()).filter(Boolean);
 const role=lines[0].replace(/^(job title|role|position)\s*:\s*/i,'').slice(0,90);
 const topics=skills.length?skills:lines.filter(l=>l.length>20).map(l=>l.slice(0,85)).slice(0,5);
 const templates=[
 ['Technical',t=>`How would you apply ${t} to deliver a reliable solution in this role?`,'Explain your approach, a concrete example, trade-offs, and how you would validate the result.'],
 ['Behavioral',t=>`Tell me about a time you used ${t} to solve a difficult problem.`,'Use STAR: describe the situation, your task, your specific actions, and the measurable result.'],
 ['Situational',t=>`A project involving ${t} is behind schedule. How would you diagnose the problem and decide what to do next?`,'Clarify constraints, identify the highest risks, compare options, align stakeholders, and define success metrics.'],
 ['Role-specific',t=>`What would your first 30 days look like when taking ownership of ${t}?`,'Discuss discovery, stakeholder needs, a small early win, and a measurable plan for improvement.']
 ];
 return {role,summary:`Practice set based on the wording and detected skills in your job description. These are template questions; enable AI for deeper role analysis.`,skills:topics,questions:Array.from({length:count},(_,i)=>{const [category,make,answerGuide]=templates[i%4];const topic=topics[Math.floor(i/4)%topics.length];return {category,difficulty:level==='Junior'?'Easy':level==='Mid-level'?'Medium':'Hard',question:make(topic),why:`This explores ${topic}, which appears in the job description.`,answerGuide};})};
}
export function demoFeedback(answer) {
 return {score:0,strengths:'Your answer has been saved for practice.',improvements:'Demo mode cannot assess the correctness or relevance of your answer. Review it against the answer guide: did you explain your actions, trade-offs, and results?',sampleAnswer:'Use a real example: “The situation was … My responsibility was … I chose … because … The outcome was … Next time I would …”'};
}
