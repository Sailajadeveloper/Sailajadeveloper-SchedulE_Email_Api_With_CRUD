module.exports = (app) => {
  const userEmailsController = require('../controllers/userEmailsController');
  const validationController = require('../controllers/validationController');
  var router = require('express').Router();
  router.post('/insert-emails', [ validationController.validateInsertEmail,userEmailsController.insertEmails]);

  app.use('/', router);
};