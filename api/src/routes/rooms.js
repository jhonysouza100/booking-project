import express from 'express';
import { CreateRoom, DeleteRoom, GetAllRooms, GetRoom, UpdateRoom, UpdateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, CreateRoom);
// UPDATE
router.put("/:id", verifyAdmin, UpdateRoom);
router.put("/availability/:id", UpdateRoomAvailability);
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, DeleteRoom);
// GET
router.get("/:id", GetRoom);
// GET ALL
router.get("/", GetAllRooms);


export default router;