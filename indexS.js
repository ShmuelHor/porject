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
        res.status(200).send(user);
});

app.get('/api/therapists/area/:region', async(req, res) => {
    console.log("indexjs work");
    const user = await db.getTHerapists("location",req.params.region)
    res.status(200).send(user);
});

app.get('/api/therapists/specialty/:specialty', async(req, res) => {
    const user = await db.getTHerapistsBySpecialty(req.params.specialty)
    res.status(200).send(user);
});


app.get('/api/appointments/:therapistsId', async(req, res) => {  
    const user = await db.getAppointmentsById(req.params.therapistsId)
    res.status(200).send(user);
});

app.post('/api/appointments/:therapistsId/:objectId', async(req, res) => {
    const userId = req.body
    console.log(userId);
    const user = await db.postNewAppointment(req.params.therapistsId   ,req.params.objectId    ,userId.userId)
    res.status(200).send(user);
});

app.get('/api/appointments/all/:userId', async(req, res) => {
    const user = await db.getUserAppointments(req.params.userId)
    res.status(200).send(user);
});

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
