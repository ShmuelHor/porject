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
            


async function getUser(user) {
    const result = await User.findOne({userName: user.userName, password: user.password})
    return result
}

async function createUser(newUser) {
    const result = await User.create(newUser)
    return result
}


main()
createUser({userName:"shmuel1",password:"123456"})
// createUser({userName:"shmuel2",password:"123456"})
// createUser({userName:"shmuel3",password:"123456"})
// createUser({userName:"shmuel4",password:"123456"})
// createUser({userName:"shmuel5",password:"123456"})
// createUser({userName:"shmuel6",password:"123456"})
// createUser({userName:"shmuel7",password:"123456"})

/*
createUser({userName:"Yedidya", password:"12345"})
*/
module.exports = {
    getUser,
    createUser
}