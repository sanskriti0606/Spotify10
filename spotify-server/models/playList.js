// models/playList.js
import mongoose from 'mongoose';
import Joi from 'joi';

const playListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const PlayList = mongoose.model('PlayList', playListSchema);

const validatePlayList = (playList) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    songs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), // Validate ObjectId strings
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Validate ObjectId string
  });

  return schema.validate(playList);
};

export { PlayList, validatePlayList };
