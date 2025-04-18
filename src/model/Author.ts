import { Schema, model } from 'mongoose';

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, default: '' }, // Optional bio
  },
  { timestamps: true }
);

const Author = model('Author', authorSchema);

export default Author;