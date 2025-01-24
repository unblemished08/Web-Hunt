import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import error from './error.js';
import dbConnect from './dbConnect.js';
import mongoose from "mongoose";

const app = express();
dotenv.config();
//dbConnect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(error);
app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Default route has been running successfully',
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const TeamSchema = new mongoose.Schema({
    roll: String,
    team: String,
    name: String,
    score: Number,
    date: String,
});


const Team = mongoose.model('Team', TeamSchema);

// Save data to MongoDB
app.post('/api/saveData', async (req, res) => {
  try {
    const { roll, team, name, score, date } = req.body;

    const newTeam = new Team({ roll, team, name, score, date });
    //await newTeam.save();
    console.log(newTeam);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});