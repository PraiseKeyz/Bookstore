import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    publishedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Book = model('Book', bookSchema);

export default Book;
