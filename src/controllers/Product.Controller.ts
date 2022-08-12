import { Request, Response, NextFunction } from 'express';
import productService from "../services/Product.Service";

const createProduct = async (req: Request, res: Response) => {
    return productService
      .createProduct(req, res)
      .then((successResponse) => successResponse)
      .catch((errorResponse) => errorResponse)
}

const updateProduct = (req: Request, res: Response) => {
    return productService
      .updateProduct(req, res)
      .then((successResponse) => successResponse)
      .catch((errorResponse) => errorResponse)
};

const deleteProduct = (req: Request, res: Response) => {
    return productService
      .deleteProduct(req, res)
      .then((successResponse) => successResponse)
      .catch((errorResponse) => errorResponse)
};

const getOneProduct = (req: Request, res: Response) => {
    return productService
      .getOneProduct(req, res)
      .then((successResponse) => successResponse)
      .catch((errorResponse) => errorResponse)
};

const getAllProducts = (req: Request, res: Response) => {
    return productService
      .getAllProduct(req, res)
      .then((successResponse) => successResponse)
      .catch((errorResponse) => errorResponse)
};

export default {createProduct, updateProduct, deleteProduct, getOneProduct, getAllProducts};