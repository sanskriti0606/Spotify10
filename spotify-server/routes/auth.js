import { Router } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Authenticate user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ message: 'Invalid email or password!' });

  // Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send({ message: 'Invalid email or password!' });

  // Generate token
  const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });

  // Respond with success message and token
  res.status(200).send({
    message: 'Logged in successfully',
    token,
  });
});

export default router;
