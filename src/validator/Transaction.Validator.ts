import Joi from "joi";
import { ITransaction, ITransactionCreate } from "../models/Transaction";

export const Schemas = {
  transaction: {
    create: Joi.object<ITransactionCreate>({
      product_id: Joi.string().required(),
      quantity: Joi.number().integer().required()
    }),
    update: Joi.object<ITransaction>({
      quantity: Joi.number().integer().required()
    }),
  }
}