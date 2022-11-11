const {UserEmails } = require('../imports');
const {response,nodemailTrigger,sendGridEmailTrigger } = require('../Utils/utils');

/* Schedule Email and Sending Them Through Api start*/

exports.sendEmails = async (req,res)=>{
  try{
    console.log("req.body sendemail",req.body);
    let userEmailsData = [];
    let emailsdata = await UserEmails.find({},{'email':1,'_id':0})
    if(emailsdata){
      emailsdata.map((emails,i)=>{
        if(emails.email){
          userEmailsData.push(emails.email);
        }
      })
      /* let emailsData = ['sailajasetty1999@gmail.com','sailu@yahoo.com','sailaja.b@axlrdata.com'] */
      for (let i = 0; i < userEmailsData.length; i++) {
        // nodemailTrigger(userEmailsData[i])
        nodemailTrigger(userEmailsData[i],req.body)
        // sendGridEmailTrigger(userEmailsData[i],req.body,(err,data)=>{
        //   if(err){
        //   console.log("Error:" + err);
        //   }else{
        //     console.log("Email sent : " + data);
        //   }
        // });
      }
      return res.json(response(true, 200, "Emails sent successfully",  emailsdata));
    }else{
      console.log("IMPORTANT: Emails Data Not Found!");
      return res.json(response(true, 204, "Emails Data Not Found!"));
    }
  }
  catch(err){
    console.log("Something Went Wrong",err);
    return res.json(response(true, 500, "Something went wrong!"));

  }
}
/* Schedule Email and Sending Them Through Api End*/
