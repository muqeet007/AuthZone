import express from 'express';
import { protect } from '../middleware/protect.js'; // adjust the path as needed

const router = express.Router();

// ✅ Protected Route
router.get('/dashboard', protect, (req, res) => {
  res.send(`Welcome to your dashboard, ${req.user.useremail}`);
});

// ✅ Another Protected Route
router.get('/profile', protect, (req, res) => {
  res.send(`This is the profile for user ID: ${req.user.userid}`);
});

export default router;
