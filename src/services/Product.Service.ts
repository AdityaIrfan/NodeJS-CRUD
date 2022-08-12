import { Request, Response } from "express";
import productRepository from "../repositories/Product.Mongoo";
import Product from "../models/Product"
import mongoose from "mongoose";

const createProduct = (req: Request, res: Response) => {
  const {name, price, quantity} = req.body;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    price: price,
    quantity: quantity
  });

  return productRepository
    .createProduct(product)
    .then((product: any) => {
      res.status(201).json({product})
    })
    .catch((error: any)=> {
      res.status(500).json({error})
    })
}

const updateProduct =  (req: Request, res: Response) => {
  return productRepository
    .getOneProduct(req.params.id)
    .then((product) => {
      if (product) {
        product.set(req.body);
        productRepository
          .updateProduct(product)
          .then((product) => {
            res.status(201).json({product})
          })
          .catch((error) => {
            res.status(500).json({error})
          })
      } else {
        res.status(404).json({'Message': 'Product not found'})
      }
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

const getOneProduct = (req: Request, res: Response) => {
  return productRepository
    .getOneProduct(req.params.id)
    .then((product) => {
      product  ? res.status(201).json({product}) : res.status(404).json({'Message': 'Product not found'})
    })
    .catch((error) => {
      res.status(500).json({error})
    })
};

const getAllProduct = (req: Request, res: Response) => {
 return productRepository
    .getAllProducts(req)
    .then((product) => {
      res.status(201).json({product})
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

const deleteProduct = (req: Request, res: Response) => {
  return productRepository
    .getOneProduct(req.params.id)
    .then((product) => {
      if (product) {
        productRepository
          .deleteProduct(product._id)
          .then(() => {
            res.status(201).json({'Message': 'Deleted Success'})
          })
          .catch((error) => {
            res.status(500).json({error})
          })
      } else {
        res.status(404).json({'Message': 'Product not found'})
      }
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

export default { createProduct, updateProduct, getOneProduct, getAllProduct, deleteProduct } ;