import { Request, Response, NextFunction } from 'express';
import transactionService from "../services/Transaction.Service";

const createTransaction = (req: Request, res: Response, next: NextFunction) => {
  return transactionService
    .createtransaction(req, res)
    .then((successResponse) => successResponse)
    .catch((errorResponse) => errorResponse)
}

const updateTransaction = (req: Request, res: Response, next: NextFunction) => {
  return transactionService
    .updatetransaction(req, res)
    .then((successResponse) => successResponse)
    .catch((errorResponse) => errorResponse)
}

const deleteTransaction = (req: Request, res: Response, next: NextFunction) => {
  return transactionService
    .deletetransaction(req, res)
    .then((successResponse) => successResponse)
    .catch((errorResponse) => errorResponse)
}

const getOneTransaction = (req: Request, res: Response, next: NextFunction) => {
  return transactionService
    .getOnetransaction(req, res)
    .then((successResponse) => successResponse)
    .catch((errorResponse) => errorResponse)
}

const getAllTransaction = (req: Request, res: Response, next: NextFunction) => {
  return transactionService
    .getAlltransaction(req, res)
    .then((successResponse) => successResponse)
    .catch((errorResponse) => errorResponse)
}

export default { createTransaction, updateTransaction, deleteTransaction, getOneTransaction, getAllTransaction };