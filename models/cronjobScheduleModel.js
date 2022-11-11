const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  seconds:{
    type: String,
    required: false,   //value must be 0-59
    min: 0,
    max: 59,
    default: "*"
  },
  minutes:{
    type: String,       //value must be 0-59
    required: true,
    min: 0,
    max: 59,
    default: "*"
  },
  hours:{
    type: String,       //value must be 0-23
    required: true,
    min: 0,
    max: 23,
    default: "*"
  },
  day_of_month:{
    type: String,       //value must be 1-31
    required: true,
    min: 1,
    max: 31,
    default: "*"
  },
  month:{
    type: String,       //value must be 1-30
    required: true,
    default: "*"
  },
  day_of_week:{
    type: Number,       //value must be 0-7
    required: true,
    default: "*"
  }
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})
module.exports = mongoose.model('cronjob_schedule',scheduleSchema,'cronjob_schedule');
