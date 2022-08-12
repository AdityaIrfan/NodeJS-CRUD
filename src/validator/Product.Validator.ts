import Joi from "joi";
import { IProduct } from "../models/Product";

export const Schemas = {
  product: {
    create: Joi.object<IProduct>({
      name: Joi.string().required().min(3).max(10),
      price: Joi.number().integer().required().min(3),
      quantity: Joi.number().integer().required().min(1)
    }),
    update: Joi.object<IProduct>({
      name: Joi.string().min(3).max(10),
      price: Joi.number().integer().min(3),
      quantity: Joi.number().integer().min(1)
    }),
  }
}