import { Router } from 'express';
import { User, validateUser } from '../models/user.js';
import bcrypt from 'bcrypt';
import admin from '../middleware/admin.js';
import auth from '../middleware/auth.js';
import validateObjectId from '../middleware/validateObjectId.js';

const router = Router();

// create user
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(403)
      .send({ message: 'User with given email already exists!' });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = await new User({
    ...req.body,
    password: hashPassword,
  }).save();

  newUser.password = undefined;
  newUser.__v = undefined;
  res.status(200).send({ data: newUser, message: 'Account created successfully' });
});

// Additional routes for fetching, updating, deleting users, etc.

export default router;
