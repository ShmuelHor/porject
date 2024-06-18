const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Therapist = require('../models/therapistModel');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/register', async (req, res) => {
    try {
      const { userName, address: address, password, confirm_password } = req.body;

      // Check if all required fields are present
      if (!userName || !address  || !password || !confirm_password) {
        throw new Error("All fields are required");
      }
      if (password !== confirm_password)
        throw new Error("Passwords do not match");

    //   Check if user already exists with the given email
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this name" });
      }

      const hashpass = await bcrypt.hash(password, 10);
      if (!hashpass) throw new Error("try again");

      const user = req.body;
      user.password = hashpass;

      const newUser = new User(req.body);
      await newUser.save();

       // Respond with success message
       res.status(201).json({ 
            user,
            message: "User registered successfully" 
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(400).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: 'All inputs are required' });
    }

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        console.log(user);
        res.json(user);
    } catch (error) {
        console.error('Internal Server Error:', error.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/therapists', async (req, res) => {
    try {
        const therapists = await Therapist.find();
        res.json(therapists);
    } catch (error) {
        console.error('Error fetching therapists', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/therapists/:specialty/:location', async (req, res) => {
    const { specialty, location } = req.params;
    try {
        const therapists = await Therapist.find({
            specialization: { $in: [specialty] },
            location: location
        });
        if (therapists.length > 0) {
            res.json(therapists);
        } else {
            res.status(404).send('No therapists found for the specified specialty and location');
        }
    } catch (error) {
        console.error('Error fetching therapists by specialty and location', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
