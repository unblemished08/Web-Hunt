import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import error from './error.js';

import database from './firebaseConfig.js'
import { collection,addDoc } from 'firebase/firestore';

const app = express();
dotenv.config();
const value=collection(database,"TeamDetails");


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



// Save data to Firebase
app.post('/api/saveData', async (req, res) => {
  try {
    const { roll, team, name, score, date } = req.body;
    await addDoc(value,{roll: roll, team: team,name: name,score:score,date:date});

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});