const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dbName = 'systemDB'

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/' + dbName);
        // use the operations here to test
    } catch (error) {
        console.error(error)
    }
}

const userSchema = new Schema({
    userName: String,
    password: String
})

const User = mongoose.model('users', userSchema)

const therpaistsSchema = new Schema({
    therpaistsName: String,
    specialization: [String],
    location: String,
    appointments:[
        {
            date: String,
            time: String,
            idUser: String,
            idThrapist: String
        }
    ]
})

const Therapist = mongoose.model('therapists', therpaistsSchema)
            


async function getUser(user) {
    const result = await User.findOne({userName: user.userName, password: user.password})
    return result
}

async function createUser(newUser) {
    const result = await User.create(newUser)
    return result
}


async function createTherpaist(newTherpaist) {
    const result = await Therapist.create(newTherpaist)
    return result
}

async function getTHerapists() {
    const result = await Therapist.find()
    return result
}

async function getTHerapists(field, value) {
    
    const result = await Therapist.find({ [field]: value });
    return result;
}


async function getTHerapistsBySpecialty(value) {
    
    const result = await Therapist.find({["specialization"]: { $in: [value] } });
    return result;
}

async function getAppointmentsById(id) {
    const result = await Therapist.findOne({_id: id});
    return result.toObject().appointments.filter(appointment => !appointment.idUser );
}


async function postNewAppointment(therapistId, appointmentId, userId) {
    const result = await Therapist.updateOne(
        { _id: therapistId, 'appointments._id': appointmentId }, // תנאי החיפוש עם ObjectId
        { $set: { 'appointments.$.idUser': userId } } // העדכון שאנחנו מבצעים
    );
    return result;
}


async function getUserAppointments(userId) {
    try {
        const result = await Therapist.aggregate([
            { $unwind: '$appointments' }, // מפרק את מערך הפגישות לאובייקטים נפרדים
            { $match: { 'appointments.idUser': userId } }, // מוצא פגישות לפי idUser
            { $project: {
                _id: 0,
                therapistsName: 1,
                specialization: 1,
                location: 1,
                appointment: '$appointments'
            } }
        ]);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error fetching user appointments', error);
        throw error;
    }
}

main()
module.exports = {
    getUser,
    createUser,
    getTHerapists,
    createTherpaist,
    getTHerapistsBySpecialty,
    getAppointmentsById,
    postNewAppointment,
    getUserAppointments
}
