import { Schema, Document, models, model } from "mongoose";

export interface IBook extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  category: Schema.Types.ObjectId;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    coverImage: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
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
