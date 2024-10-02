import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    res.status(201).send("User has been created successfully");
  } catch (err) {
    next(err);
  }
}

export const Login = async (req, res, next) => {
  try {
    const userFound = await User.findOne({email: req.body.email});
    if(!userFound) return next(createError(404, 'User not found'));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, userFound.password);
    if(!isPasswordCorrect) return next(createError(400, "Password incorrect"));

    const token = jwt.sign({id: userFound._id, isAdmin: userFound.isAdmin}, process.env.JWT_SECRET);

    const {password, isAdmin, ...otherDetails} = userFound._doc; // exclude admin & password returns information

    res.cookie("access_token", token, {httpOnly: true}).status(200).send({...otherDetails}); // send jwt in cookies and filtered user information

  } catch (err) {
    next(err);
  }
}