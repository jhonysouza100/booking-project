import express from 'express';
import { CountByCity, CountByType, CreateHotel, DeleteHotel, GetAllHotels, GetHotel, UpdateHotel } from '../../controllers/hotel.js';
import { verifyAdmin } from '../../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, CreateHotel);
// UPDATE
router.put("/:id", verifyAdmin, UpdateHotel);
// DELETE
router.delete("/:id", verifyAdmin, DeleteHotel);
// GET
router.get("/find/:id", GetHotel);
// GET ALL
router.get("/", GetAllHotels);

router.get("/countByCity", CountByCity);
router.get("/countByType", CountByType);

export default router;