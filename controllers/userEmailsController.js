const {UserEmails } = require('../imports');
const {response,emailtrigger,sendGridEmailTrigger } = require('../Utils/utils');

 
exports.insertEmails = async (req,res)=>{
  try{
    reqdata= req.body;
    console.log(reqdata,"===reqdata");
    let emailsResult = await UserEmails.findOne({"email":reqdata.email});
    console.log(emailsResult);
    if(!emailsResult){
      let insertdata = {
        email: reqdata.email,
        mailed_status: false,
      }
      let emailsdataC = await UserEmails.create(insertdata)
      console.log(emailsdataC,"===emailsdata created");
      // res.send({ result: {status:true, stauscode: 200, message: "Email Inserted successfully", data: emailsdataC}
      // })
      return res.send({response: (true, 200, "Email Inserted successfully", emailsdataC) });
    }else{
      return res.send({response: (false, 400, "Email already existed.")});
    }
  }
  catch(err){
    console.log(err);
    return res.send({response: (false, 500, "Something Went Wrong", err)});
  }
} 