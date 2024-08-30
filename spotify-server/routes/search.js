import express from 'express';
import { Song } from '../models/song.js';
import { PlayList } from '../models/playList.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
    // Ensure 'search' is a string and handle empty or undefined values
    const search = String(req.query.search || '').trim();

    if (search) {
        try {
            // Perform the search in both Songs and PlayLists collections
            const songs = await Song.find({ name: { $regex: search, $options: 'i' } }).limit(10);
            const playlists = await PlayList.find({ name: { $regex: search, $options: 'i' } }).limit(10);

            // Send back the search results
            const result = { songs, playlists };
            res.status(200).send(result);
        } catch (error) {
            // Handle any errors that occurred during the search
            console.error('Error occurred during search:', error);
            res.status(500).send({ message: 'An error occurred during the search.' });
        }
    } else {
        // Handle the case where 'search' is empty or undefined
        res.status(200).send({});
    }
});

export default router;
