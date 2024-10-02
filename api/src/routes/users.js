import express from 'express';
import { DeleteUser, GetAllUsers, GetUser, UpdateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/check" , verifyToken, (req, res, next) => {
  res.send("Hello after checking jwt middleware");
});

router.get("/checkuser/:id" , verifyUser, (req, res, next) => {
  res.send("Hello user, your are logged in and you can delete your account");
});

router.get("/checkadmin/:id" , verifyAdmin, (req, res, next) => {
  res.send("Hello admin, your are logged in and you can delete all accounts");
});

// UPDATE
router.put("/:id", verifyUser, UpdateUser);
// DELETE
router.delete("/:id", verifyUser, DeleteUser);
// GET
router.get("/:id", verifyUser, GetUser);
// GET ALL
router.get("/", verifyAdmin, GetAllUsers);

export default router;