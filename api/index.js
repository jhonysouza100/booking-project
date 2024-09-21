import express from 'express';
import { config } from 'dotenv';
import authRoute from './routes/auth.js';
import usersRoute from './routes/auth.js';
import hotelsRoute from './routes/auth.js';
import roomsRoute from './routes/auth.js';
import mongoose from 'mongoose';
config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to mongoDB!")
  } catch (error) {
    throw error;
  }
}

const app = express();

// middlewares
app.use('api/auth', authRoute);
app.use('api/users', usersRoute);
app.use('api/hotels', hotelsRoute);
app.use('api/rooms', roomsRoute);

app.listen(8080, () => {
  // connect();
  console.log("Connect to backend!");
});