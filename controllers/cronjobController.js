const {cron, CronJobSchedule, objectid} = require('../imports');
const { response } = require('../Utils/utils');

/* Global Cronjob Functionality Start */
exports.emailSend = async(req, res, next) => {
  cronJobForEmailsend();
}
async function cronJobForEmailsend(){
  let scheduleData = await CronJobSchedule.findOne({},{_id:0,created_at:0,updated_at:0}).sort({ updated_at: -1 }).limit(1)
  console.log(scheduleData,"===scheduleData global cron");

  const seconds = scheduleData.seconds;
  const minutes = scheduleData.minutes;
  const hour = scheduleData.hours;
  const day = scheduleData.day_of_month;
  const month = scheduleData.month;
  const week = scheduleData.day_of_week;
  const timing = `${seconds} ${minutes} ${hour} ${day} ${month} ${week}`;
  // const timing = ('0 12,15,16,21,23 * * * ');
  // timing = ('* * * * * *') //to send for every second
  // timing = ('* * * * *') //to send for every minute
  // timing = ('*/5 * * * *') //to send for every 5minutes
  // timing = ('*/5 * * * Sunday') //to send on every sunday for every 5minutes
  
  const timeZone = { scheduled: true, timezone: "Asia/Kolkata" };
  const cronJobFunction = () => {
    try {
      require("./mailSendingController").sendEmails();
      console.log(
        "**************************....Emails Sent updated....**************************"
      );
    } catch (e) {
      console.log(" error in cron Job For Emails Sent : ", e);
    }
  };
  cron.schedule(timing, cronJobFunction, timeZone);
}
/* Global Cronjob Functionality End */

exports.getAllCronJobSchedules = async(req, res) => {
  try{
    let scheduledData = await CronJobSchedule.find({});
    if(scheduledData){
      console.log(scheduledData,"==scheduledData List");
      return res.send(response(true, 200, "Cronjob Scheduled Data Found", scheduledData));
    }else{
      return res.send(response(false, 204, "Cronjob Scheduled Data Not Found",scheduledData));
    }
  }catch(err){
    console.log("ERROR: " + err);
    return res.send(response(false, 500, "Something went wrong", err));
  }
}
exports.insertCronJobSchedule = async(req, res) => {
  try{
    let reqData = req.body;
    let inserData = {};
    if(reqData.seconds){
      inserData.seconds = reqData.seconds;
    }
    inserData.minutes = reqData.minutes;
    inserData.hours = reqData.hours;
    inserData.day_of_month = reqData.dayOfMonth;
    inserData.month = reqData.month;
    inserData.day_of_week = reqData.dayOfWeek;
    console.log(inserData,"===inserData");
    let scheduledData = await CronJobSchedule.create(inserData);
    console.log(scheduledData,"===scheduledData insert");
    return res.send(response(true, 200, "Cronjob Scheduled Data Created", scheduledData));
  }catch(err){
    console.log("ERROR: " + err);
    return res.send(response(false, 500, "Something went wrong", err));
  }
}
exports.updateCronJobSchedule = async(req, res) => {
  try{
    let reqData = req.body;
    let updateData = {};
    if(reqData.seconds){
      updateData.seconds = reqData.seconds;
    }
    updateData.minutes = reqData.minutes;
    updateData.hours = reqData.hours;
    updateData.day_of_month = reqData.dayOfMonth;
    updateData.month = reqData.month;
    updateData.day_of_week = reqData.dayOfWeek;
    let scheduledDataUpdate = await CronJobSchedule.updateOne({_id: req.params.id},updateData);
    console.log(scheduledDataUpdate,"===scheduledDataUpdate Update");
    // process.exit();
    if(scheduledDataUpdate){
      let scheduledData = await CronJobSchedule.find({_id: req.params.id});
      if(scheduledData){
        return res.send(response(true, 200, "Cronjob Scheduled Data Updated", scheduledData));
      }
    }else{
      return res.send(response(false, 204, "Cronjob Scheduled Data Not Found",scheduledData));
    }
  }catch(err){
    console.log("ERROR: " + err);
    return res.send(response(false, 500, "Something went wrong", err));
  }
}
exports.deleteCronJobSchedule = async(req,res)=>{
  try{
    console.log(req.params.id,"===params id");
    let scheduledDataDel = await CronJobSchedule.findOneAndDelete({_id: req.params.id});
    console.log(scheduledDataDel,"==scheduledDataDel delete");
    if(scheduledDataDel){
      let scheduledData = await CronJobSchedule.find({});
      if(scheduledData){
        return res.send(response(true, 200, "Cronjob Scheduled Data Deleted", scheduledData));
      }else{
        return res.send(response(false, 204, "Cronjob Scheduled Data Not Found",scheduledData));
      }
    }else{
      return res.send(response(false, 500, "Something went wrong While Deleting the File"));
    }
  }catch(err){
    console.log("ERROR: " + err);
    return res.send(response(false, 500, "Something went wrong", err));
  }
} 