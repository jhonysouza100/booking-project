import express from 'express';
import { CreateRoom, DeleteRoom, GetAllRooms, GetRoom, UpdateRoom } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, CreateRoom);
// UPDATE
router.put("/:id", verifyAdmin, UpdateRoom);
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, DeleteRoom);
// GET
router.get("/:id", GetRoom);
// GET ALL
router.get("/", GetAllRooms);


export default router;