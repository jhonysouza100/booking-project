import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Users endpoint");
});

export default router;