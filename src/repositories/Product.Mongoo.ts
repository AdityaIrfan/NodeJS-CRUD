import Product, { IProductModel } from "../models/Product";
import { Op } from "sequelize";
import { Request } from "express";

function createProduct (product: IProductModel) {
  return product
      .save()
      .then((product) => product)
      .catch((error) => error)
}

function updateProduct (product: IProductModel) {
    return product
      .save()
      .then((product)=> product)
      .catch((error)=> error)
}

async function deleteProduct (id: String) {
    return Product
      .findByIdAndDelete(id)
      .then()
      .catch((error) => error)
}

async function getOneProduct (id: String) {
    return Product
      .findById(id).
      then((product) => product)
      .catch((error) => error)
}

async function getAllProducts (req: Request) {
  try {
    const limit = parseInt(<string>req.query.limit) || 5;
    const page = parseInt(<string>req.query.page) || 1;
    const offset =  (page-1)* limit;

    const productCollection = await Product.find({}).skip(offset).limit(limit);
    const productCollectionCount = await Product.count();

    const totalPage = Math.ceil(productCollectionCount/limit)

    return {
      data: productCollection,
      pagging: {
        total: productCollectionCount,
        page: page,
        pages: totalPage
      }
    }
  } catch (e) {
    return e
  }
}

export default { createProduct, updateProduct, deleteProduct, getOneProduct, getAllProducts };