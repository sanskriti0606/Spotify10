import { Router } from 'express';
import mongoose from 'mongoose'; // Ensure mongoose is imported
import { PlayList, validatePlayList } from '../models/playList.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, async (req, res) => {
  try {
    const { error } = validatePlayList(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { name, description, songs, user } = req.body;

    // Ensure songs is an array
    if (!Array.isArray(songs)) {
      return res.status(400).send({ message: '"songs" must be an array' });
    }

    // Convert songs to ObjectId format
    const songsObjectIds = songs.map(songId => mongoose.Types.ObjectId(songId));

    const playList = new PlayList({
      name,
      description,
      songs: songsObjectIds,
      user: req.user._id
    });

    await playList.save();
    res.status(201).send({ data: playList, message: 'Playlist created successfully' });
  } catch (err) {
    console.error('Error creating playlist:', err.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;
