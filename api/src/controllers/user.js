import User from '../models/User.js';


export const CreateUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
}

export const UpdateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id, 
    );
    res.status(200).json(`User id: ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
}

export const GetUser = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.id, 
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      req.params.id, 
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}