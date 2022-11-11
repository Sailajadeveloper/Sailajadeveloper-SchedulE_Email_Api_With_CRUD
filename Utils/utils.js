const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const { cron } = require('../imports');


response = (status, statusCode, message, data={}) => {
  return { result: { status, statusCode, message, data } }
}

validateHeaders = (requestData, schema, cb) => {
  let keys = Object.keys(requestData)
  let temp_array = [];
  let temp_array1 = [];
  for (var i in schema) {
      if (!keys.includes(schema[i]) || requestData[schema[i]] == null || requestData[schema[i]] == undefined){
        temp_array.push(schema[i].toUpperCase().replace(/_/g, " "))
      }else if(requestData[schema[i]] == null || requestData[schema[i]] == undefined){
        temp_array1.push(schema[i].toUpperCase().replace(/_/g, " "))
      }
  }
  if (temp_array.length > 0) {
      let adverb = temp_array.length > 1 ? " are" : " is"
      let message = temp_array + adverb + " missing"
      cb(message)
  } else if (temp_array1.length > 0) {
    let message = temp_array1 + " can't be empty "
    cb(message)
  }else{
      cb(null, true)
  }
}

validations = (requestData, schema, cb) => {
  let keys = Object.keys(requestData)
 
     let temp_array = [];
     let temp_array1 = [];
     for (var i in schema) {
         if (!keys.includes(schema[i]) || requestData[schema[i]] == null || requestData[schema[i]] == undefined){
           temp_array.push(schema[i].toUpperCase().replace(/_/g, " "))
         }else if(requestData[schema[i]] == null || requestData[schema[i]] == undefined || requestData[schema[i]] == ''){
           temp_array1.push(schema[i].toUpperCase().replace(/_/g, " "))
         }
     }
     if (temp_array.length > 0) {
         let adverb = temp_array.length > 1 ? " are" : " is"
         let message = temp_array + adverb + " missing"
         cb(message)
     } else if (temp_array1.length > 0) {
       let message = temp_array1 + " can't be empty "
       cb(message)
     }else{
         cb(null, true)
     }
 
 }

 /* Schedule Email and Sending Them Through nodemailer */
async function nodemailTrigger(toEmails,scheduleData,cb){
    let mailOptions = {
      from: process.env.FROM_EMAIL,
      to: toEmails,
      subject: 'scheduled Email sending test',
      text: 'scheduled email functionality implementation',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
    };
    
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      service: 'gmail',
      auth:{
        user: process.env.FROM_EMAIL,
        pass: `ypmwgmnguqixcwyu`
      }
    })
    /* For normal functionality also will use it for global cronjob start*/
    // transporter.sendMail(mailOptions,(err, info)=>{
    //   if(err){
    //     console.log("ERROR in sending mail : " + err);
    //   }else{
    //     console.log("Email sent : " + info.response);
    //   }
    // })
    /* For normal functionality also will use it for global cronjob end*/

    /* For internal cronjob functionality with dynamic schedule start*/
    const sec= scheduleData.seconds;
    const min= scheduleData.minutes;
    const hrs= scheduleData.hours;
    const day= scheduleData.dayOfMonth;
    const mont= scheduleData.month;
    const week= scheduleData.dayOfWeek;
    let timings = "";
    if(scheduleData.seconds){
      timings = `${sec} ${min} ${hrs} ${day} ${mont} ${week}`;
    }else{
      timings = `${min} ${hrs} ${day} ${mont} ${week}`;
    }
    cron.schedule(timings,()=>{
      transporter.sendMail(mailOptions,(err, info)=>{
        if(err){
          console.log("ERROR in sending mail : " + err);
        }else{
          console.log("Email sent : " + info.response);
        }
      })
    })
    /* For internal cronjob functionality with dynamic schedule end*/


}

 /* Schedule Email along with seconds and Sending Them Through sendGrid */
async function sendGridEmailTrigger(toEmails,scheduleData, cb) {
  console.log(process.env.SENDGRID_API_KEY,"====${process.env.SENDGRID_API_KEY}")
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: toEmails,
		from: process.env.SENDGRID_EMAIL,
		subject: 'scheduled Email sending test',
		text: 'scheduled email functionality implementation',
    html: '<b>Hey there! </b><br> This is our first scheduled email sent with SendGrid.'
	};
  console.log("the first cron scheduled");
  const sec= scheduleData.seconds;
  const min= scheduleData.minutes;
  const hrs= scheduleData.hours;
  const day= scheduleData.day;
  const mont= scheduleData.month;
  const week= scheduleData.week;
  cron.schedule(`${sec} ${min} ${hrs} ${day} ${mont} ${week}`,()=>{
    sgMail.send(msg)
    .then((resp) => {
      cb(null, resp);
    })
    .catch((err) => {
      console.log(err);
      cb(err, null);
    });
  })
}

module.exports = { response,nodemailTrigger,sendGridEmailTrigger,validateHeaders, validations}
