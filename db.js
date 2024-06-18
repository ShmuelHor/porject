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
            idUser: String
        }
    ]
})

const Therapist = mongoose.model('therapists', userSchema)
            


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
    console.log(result);
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

async function getTHerapistById(id) {
    const result = await Therapist.findOne({_id: id});
    return result.toObject().appointments.filter(appointment => !appointment.idUser );
}


async function postNewAppointment(therapistsId, appointmentId, userIdToPost) {
    const result = await Therapist.updateOne(
        { _id: therapistsId, 'appointments._id': appointmentId}, // תנאי החיפוש
        { $set: {'appointments.$.idUser': userIdToPost} } // העדכון שאנחנו מבצעים
    );
    console.log(result);
    return result
}

main()
postNewAppointment("66714e841a647bb071c7fb60","66714e841a647bb071c7fb62","secsus");
module.exports = {
    getUser,
    createUser,
    getTHerapists,
    createTherpaist,
    getTHerapistsBySpecialty,
    getTHerapistById,
    postNewAppointment
}
