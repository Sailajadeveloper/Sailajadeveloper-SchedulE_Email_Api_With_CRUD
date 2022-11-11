const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userEmailSchema = new Schema({
    email: String,
    mailed_status: Boolean
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
});
module.exports = mongoose.model('user_email', userEmailSchema);