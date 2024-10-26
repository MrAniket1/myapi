// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://aniket07r:iF10imn6Zppi8DQx@cluster1.qywzg.mongodb.net/'; // Replace with your connection string
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define User schema and model
const userSchema = new mongoose.Schema({
    created_date: { type: Date, default: Date.now },
    customer_care_number: { type: String, default: '6266562082' },
    customer_email: { type: String, default: null },
    customer_name: { type: String, default: null },
    expiry_date: { type: Date },
    last_plan_type: { type: String, default: 'FreeTrial' },
    location_info: {
        country: { type: String, default: 'India' },
        currency: { type: String, default: 'INR' },
        default: { type: Boolean, default: false },
        dial_code: { type: String, default: '+91' },
        name: { type: String, default: 'India' },
        name_code: { type: String, default: 'IN' }
    },
    my_number: { type: String, required: true },
    plan_type: { type: String, default: 'Expired' },
    trial_days: { type: Number, default: 0 },
    premiumUsageObject: {
        attachment: { type: Boolean, default: false },
        batching: { type: Boolean, default: false },
        caption: { type: Boolean, default: false },
        customisation: { type: Boolean, default: false },
        groupContactExport: { type: Boolean, default: false },
        lastDate: { type: Number, default: 26 },
        lastMonth: { type: Number, default: 9 },
        multipleAttachment: { type: Boolean, default: false },
        quickReplies: { type: Boolean, default: false },
        schedule: { type: Boolean, default: false },
        stop: { type: Boolean, default: false },
        timeGap: { type: Boolean, default: false }
    }
});

const User = mongoose.model('User', userSchema);

// Create a new user
app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a user by ID
app.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
