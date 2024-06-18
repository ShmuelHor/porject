const mongoose = require('mongoose');

const dbName = 'systemDB';

async function connectDb() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectDb;
