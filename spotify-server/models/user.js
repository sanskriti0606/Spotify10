import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: true }, // Ensure this line is included
	password: { type: String, required: true },
	gender: { type: String, required: true },
	month: { type: String, required: true },
	date: { type: String, required: true },
	year: { type: String, required: true },
	likedSongs: { type: [String], default: [] },
	playlists: { type: [String], default: [] },
	isAdmin: { type: Boolean, default: false },
  });
  
  

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWTPRIVATEKEY,
    { expiresIn: '7d' }
  );
  return token;
};

const validateUser = (user) => {
	const schema = Joi.object({
	  name: Joi.string().min(5).max(10).required(),
	  email: Joi.string().email().required(),
	  username: Joi.string().required(), // Include username in the schema
	  password: passwordComplexity().required(),
	  month: Joi.string().required(),
	  date: Joi.string().required(),
	  year: Joi.string().required(),
	  gender: Joi.string().valid('male', 'female', 'non-binary').required(),
	});
	return schema.validate(user);
  };
  

const User = mongoose.model('User', userSchema);

export { User, validateUser };
