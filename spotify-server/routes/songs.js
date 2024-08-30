// routes/song.js
import express from 'express';
import auth from '../middleware/auth.js'; // Ensure this path is correct
import { Song, validateSong } from '../models/song.js'; // Adjust path as needed

const router = express.Router();

// Apply authentication middleware to routes
router.post('/', auth, async (req, res) => {
  const { error } = validateSong(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const song = new Song(req.body);
  await song.save();
  res.status(201).send({ data: song, message: 'Song created successfully' });
});

// Additional routes for fetching, updating, deleting songs, etc.

export default router;
