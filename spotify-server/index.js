// import dotenv from 'dotenv';
// import 'express-async-errors';
// import express from 'express';
// import cors from 'cors';
// import connection from './db.js';
// import userRoutes from './routes/users.js';
// import authRoutes from './routes/auth.js';
// import songRoutes from './routes/songs.js';
// import playListRoutes from './routes/playLists.js';
// import searchRoutes from './routes/search.js';
// import authAdmin from './middleware/auth.js';
// import auth from './middleware/auth.js';           // Example import for the auth middleware
// import validateObjectId from './middleware/validateObjectId.js'; // Example import for the validateObjectId middleware

// dotenv.config();

// const app = express();

// connection();
// app.use(cors());
// app.use(express.json());

// // Define routes
// app.use('/api/users', userRoutes);
// app.use('/api/login', authRoutes);
// app.use('/api/songs', songRoutes);
// app.use('/api/playlists', playListRoutes);
// app.use('/api', searchRoutes);

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import 'express-async-errors'; // For handling async errors

import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import songRoutes from './routes/songs.js';
import * as playListRoutes from './routes/playLists.js'; // Adjust import if not using default
import searchRoutes from './routes/search.js';
import auth from './middleware/auth.js';

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(cors());
app.use(bodyParser.json()); 
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes); // Register authRoutes
app.use('/api/songs', auth, songRoutes);
app.use('/api/playlists', playListRoutes.default); // Use default if using named imports
app.use('/api/search', searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
