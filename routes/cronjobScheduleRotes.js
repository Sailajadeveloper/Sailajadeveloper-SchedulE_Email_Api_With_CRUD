module.exports = (app)=>{
  const cronScheduleController = require('../controllers/cronjobController');
  const validationController = require('../controllers/validationController');
  var router = require('express').Router();
  router.get('/get-cronschedules',cronScheduleController.getAllCronJobSchedules);
  router.post('/create-cronschedule',[validationController.validateScheduleTimings,cronScheduleController.insertCronJobSchedule]);
  router.post('/update-cronschedule/:id',[validationController.validateScheduleTimings,cronScheduleController.updateCronJobSchedule]);
  router.get('/delete-cronschedule/:id',[cronScheduleController.deleteCronJobSchedule]);
  app.use('/', router);
}