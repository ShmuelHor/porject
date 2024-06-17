const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();


// Middleware to parse incoming JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// GET user by id- chack if exist
app.get('/api/users/:userName/:password', async(req, res) => {
   
        const user = await db.getUser(req.params)
        res.send(user);
    
});


const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
