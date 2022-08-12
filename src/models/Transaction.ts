import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction {
  name: String,
  price: Number,
  quantity: Number,
  total_price: Number,
}

export interface ITransactionCreate {
  product_id: String,
  quantity: Number,
}

export interface ITransactionModel extends ITransaction, Document {};

const TransactionSchema: Schema = new Schema (
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
      required: [true, 'quantity is required']
    },
    total_price: {
      type: Number,
      required: [true, 'total_price is required']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITransactionModel>('Transaction', TransactionSchema);