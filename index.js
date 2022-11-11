const express = require('express');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');
const sendgrid = require('@sendgrid/mail');
const cron = require('node-cron');
const bodyparser = require('body-parser');


const PORT = process.env.PORT || 2020;
const utils = require('./Utils/utils');
const mongodb = require('./config/db.mongo');

const router = require('express').Router();
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var cronJob = require('./controllers/cronjobController');
// cronJob.emailSend();

app.get('/',(req,res)=>{
  res.send("Welcome to the Schedule Email sending Page!");
})

/* ----Rotes---- */
require('./routes/userEmailsRoutes')(app);
require('./routes/mailsendingRoutes')(app);
require('./routes/cronjobScheduleRotes')(app);


app.listen(PORT,() => {
  console.log("Server is running on port " + PORT);
})
