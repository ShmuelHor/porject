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
        location: "מרכז",
        _id: "1"
    },
    {
        therapistsName: "Sarah Johnson",
        specialization: ["עבודה סוציאלית"],
        location: "צפון",
        _id: "2"
    },
    {
        therapistsName: "Michael Davis",
        specialization: ["NLP", "פסיכולוגיה"],
        location: "דרום",
        _id: "3"
    },
    {
        therapistsName: "Emily White",
        specialization: ["פסיכולוגיה"],
        location: "מרכז",
        _id: "4"
    },
    {
        therapistsName: "David Brown",
        specialization: ["עבודה סוציאלית", "NLP"],
        location: "מרכז",
        _id: "5"
    },
    {
        therapistsName: "Rachel Green",
        specialization: ["NLP"],
        location: "צפון",
        _id: "6"
    },
    {
        therapistsName: "James Wilson",
        specialization: ["פסיכולוגיה", "עבודה סוציאלית"],
        location: "דרום",
        _id: "7"
    },
    {
        therapistsName: "Laura Taylor",
        specialization: ["עבודה סוציאלית"],
        location: "צפון",
        _id: "8"
    },
    {
        therapistsName: "Thomas Anderson",
        specialization: ["NLP", "פסיכולוגיה"],
        location: "מרכז",
        _id: "9"
    },
    {
        therapistsName: "Linda Martinez",
        specialization: ["פסיכולוגיה"],
        location: "דרום",
        _id: "10"
    }
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
