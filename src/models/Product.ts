import mongoose, { Document, Schema } from "mongoose"

export interface IProduct {
    name: String;
    price: Number;
    quantity: Number;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema (
    {
        name: {
            type: String,
            required: [true, 'name is required']
        },
        price: {
            type: Number,
            required: [true, 'price is required']
        },
        quantity: {
            type: Number,
            required: [true, 'number is required']
        }
    },
  {
    timestamps: true
  }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);