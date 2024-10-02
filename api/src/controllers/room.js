import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const CreateRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}})  // Hotel.model.js => rooms: { type: [String] }
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
}

export const UpdateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
}

export const DeleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id, );
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}})  // Hotel.model.js => rooms: { type: [String] }
    } catch (error) {
      next(error);
    }
    res.status(200).json(`Room id: ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
}

export const GetRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(
      req.params.id, 
    );
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
}

export const GetAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find(
      req.params.id, 
    );
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
}