const {response,validateHeaders,validations} = require('../Utils/utils')
const { cron, validator } = require('../imports');

exports.validateScheduleTimings = async(req, res, next) => {
  console.log(req.body,"==req.body validator");
    /* req.body = {"seconds":"0","minutes":"10","hours":"12","day":"11","month":"11","week":"5"} */
    let schema = ["minutes","hours","dayOfMonth","month","dayOfWeek"];
    let data = req.body;
    await validations(data, schema, function (err, resp) {
        if(err) {
            res.json(response(false, 400, err));
        }
        else{
            next();
        }
    });
}
exports.validateInsertEmail = async(req,res, next)=>{
  console.log(req.body,"==req.body validator");
  let schema = ["email"];
  let data = req.body;
  await validations(data, schema, function (err, resp) {
    if(err) {
      res.json(response(false, 400, err));
    }else{
      if(data.email){
        if(validator.isEmail(data.email)){
          next();
        }else{
          return res.json(response(false, 400, "Inavlid Email"));
        }
      }
    }
  });
}
