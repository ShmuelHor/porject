// insertTherapists.js

const { MongoClient } = require('mongodb');

// כתובת חיבור למסד הנתונים שלך
const url = 'mongodb://localhost:27017';
const dbName = 'systemDB'; // שם מסד הנתונים
const collectionName = 'therapists'; // שם האוסף

// מערך המטפלים שברצונך להוסיף
const therapists = [
    {
        therapistsName: "Dr. Jonathan Smith",
        specialization: ["פסיכולוגיה", "NLP"],
        location: "מרכז"
        },
    {
        therapistsName: "Sarah Johnson",
        specialization: ["עבודה סוציאלית"],
        location: "צפון"
        },
    {
        therapistsName: "Michael Davis",
        specialization: ["NLP", "פסיכולוגיה"],
        location: "דרום"
        },
    
];

async function insertTherapists() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // מתחבר למסד הנתונים
        await client.connect();
        console.log("Connected to database");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // הכנסה של המסמכים לאוסף
        const result = await collection.insertMany(therapists);
        console.log(`${result.insertedCount} documents were inserted`);

    } catch (error) {
        console.error('Error inserting documents:', error);
    } finally {
        await client.close();
    }
}

insertTherapists();
