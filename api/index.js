import express from "express";
import hotelsRoute from "./src/routes/hotels.js";
import roomsRoute from "./src/routes/rooms.js";
import usersRoute from "./src/routes/users.js";
import authRoute from "./src/routes/auth.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

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
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somethind went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});

app.listen(8080, () => {
  connect();
  console.log("Connect to backend!");
});