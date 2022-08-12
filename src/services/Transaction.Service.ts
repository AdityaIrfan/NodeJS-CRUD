import { Request, Response } from "express";
import transactionRepository from "../repositories/Transaction.Mongoo";
import productRepository from "../repositories/Product.Mongoo"
import Transaction from "../models/Transaction"
import mongoose from "mongoose";

const createtransaction = async (req: Request, res: Response) => {
  const { product_id, quantity } = req.body

  return productRepository
    .getOneProduct(product_id)
    .then((product) => {
      if (product) {
        /** Check quantity */
        if (product.quantity >= quantity) {
          const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            name: product.name,
            price: Number(product.price),
            quantity: quantity,
            total_price: Number(product.price) * quantity
          })

          transactionRepository
            .createTransaction(transaction)
            .then((transaction) => {

              /**  reduce product quantity */
              product.quantity -= transaction.quantity
              productRepository
                .updateProduct(product)
                .then(() => {
                  res.status(201).json({transaction})
                })
                .catch((error) => {
                  res.status(500).json({error})
                })

            })
            .catch((error) => {
              res.status(500).json({error})
            })
        } else {
          res.status(422).json({'Message': 'Quantity exceeds the limit'})
        }
      } else {
        res.status(404).json({'Message': 'Product not found'})
      }
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

const updatetransaction =  (req: Request, res: Response) => {
  return transactionRepository
    .getOneTransaction(req.params.id)
    .then((transaction) => {
      if (transaction) {
        const { quantity } = req.body;
        transaction.quantity = quantity;
        transaction.total_price = Number(transaction.price) * quantity;

        transactionRepository
          .updateTransaction(transaction)
          .then((transaction) => {
            res.status(201).json({transaction})
          })
          .catch((error) => {
            res.status(500).json({error})
          })
      } else {
        res.status(404).json({'Message': 'Transaction not found'})
      }
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

const getOnetransaction = (req: Request, res: Response) => {
  return transactionRepository
    .getOneTransaction(req.params.id)
    .then((transaction) => {
      transaction ? res.status(200).json({transaction}) : res.status(404).json({'Message': 'Transaction not found'})
    })
    .catch((error) => {
      res.status(500).json({error})
    })
};

const getAlltransaction = (req: Request, res: Response) => {
  return transactionRepository
    .getAllTransactions(req)
    .then((transactions) => {
      res.status(200).json({transactions})
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

const deletetransaction = (req: Request, res: Response) => {
  return transactionRepository
    .getOneTransaction(req.params.id)
    .then((transaction) => {
      if (transaction) {
        transactionRepository
          .deleteTransaction(transaction.id)
          .then(() => {
            res.status(201).json({'Messagae': 'Deleted Success'})
          })
          .catch((error) => {
            res.status(500).json({error})
          })
      } else {
        res.status(404).json({'Message': 'Transaction not found'})
      }
    })
    .catch((error) => {
      res.status(500).json({error})
    })
}

export default { createtransaction, updatetransaction, getOnetransaction, getAlltransaction, deletetransaction } ;