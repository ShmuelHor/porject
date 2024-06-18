const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();


// Middleware to parse incoming JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());


// GET car by id- chack if exist
app.get('/api/users/:userName/:password', async(req, res) => {
   
        const user = await db.getUser(req.params)
        res.send(user);
    
});

app.get('/api/therapists', async(req, res) => {
        const user = await db.getTHerapists()
        res.status(500).send(user);
});

app.get('/api/therapists/area/:region', async(req, res) => {
    console.log("indexjs work");
    const user = await db.getTHerapists("location",req.params.region)
    res.status(500).send(user);
});

app.get('/api/therapists/specialty/:specialty', async(req, res) => {
    const user = await db.getTHerapistsBySpecialty(req.params.specialty)
    res.status(500).send(user);
});


const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
