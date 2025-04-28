import { Schema, Document, models, model } from "mongoose";

export interface IBook extends Document {
  id: string;
  title: string;
  description: string;
  author: string;
  publisher: string;
  publicationDate: Date;
  images: string[];
  ISBN: string;
  price: number;
  stock: number;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    images: { type: [String], required: true },
    ISBN: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Book = models.Book || model<IBook>("Book", BookSchema);
export default Book;
