import { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  slug: string;
  description?: string;
  books: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: false, unique: true },
    description: { type: String },
    books: [{ type: Schema.Types.ObjectId, ref: "Book", default: [] }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);
export default Category;
