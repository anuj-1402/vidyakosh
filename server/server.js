import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

//initialize app
const app=express();

// connectDB
await connectDB();
//middlewares 
app.use(cors());

//routes 
app.get('/', (req, res) => {
  res.send('Server is running ');
});
app.post('/clerk',express.json(), clerkWebhooks);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
