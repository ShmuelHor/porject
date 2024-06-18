const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const therapistSchema = new Schema({
    therapistName: String,
    specialization: [String],
    location: String
});

module.exports = mongoose.model('Therapist', therapistSchema);
