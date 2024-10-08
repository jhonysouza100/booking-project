import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  img: {
    type: String
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true}
);

export default mongoose.model('User', UserSchema);