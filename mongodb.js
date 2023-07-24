// import { ConnectionPoolClosedEvent, MongoClient } from "mongodb";
// server.js (or index.js, or any server file)
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const cors=require('cors');
const port = process.env.PORT || 5000;

const uri = process.env.mongo_url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Endpoint to retrieve data from MongoDB
app.use(express.json());
app.use(cors());
app.get('/api/data', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db('col');
    const collection1 = db.collection('college'); 
    const data = await collection1.find().toArray();
    console.log(data);
    // const d= await db.find({});

    res.json(data);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).json({ error: 'Server error' });
  } 
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
