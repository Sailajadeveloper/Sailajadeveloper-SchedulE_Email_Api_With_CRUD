module.exports = (app) => {
  const emailSendController = require('../controllers/mailSendingController');
  const validationController = require('../controllers/validationController');
  var router = require('express').Router();
  router.post('/send-scheduled-emails', [ validationController.validateScheduleTimings,emailSendController.sendEmails]);
  app.use('/', router);
};