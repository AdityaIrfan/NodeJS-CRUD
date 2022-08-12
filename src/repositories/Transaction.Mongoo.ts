import Transaction, { ITransactionModel } from "../models/Transaction";
import { Request } from "express";

function createTransaction (Transaction: ITransactionModel) {
  return Transaction
    .save()
    .then((Transaction) => Transaction)
    .catch((error) => error)
}

function updateTransaction (Transaction: ITransactionModel) {
  return Transaction
    .save()
    .then((Transaction)=> Transaction)
    .catch((error)=> error)
}

async function deleteTransaction (id: String) {
  return Transaction
    .findByIdAndDelete(id)
    .then()
    .catch((error) => error)
}

async function getOneTransaction (id: String) {
  return Transaction
    .findById(id).
    then((Transaction) => Transaction)
    .catch((error) => error)
}

async function getAllTransactions (req: Request) {
  try {
    const limit = parseInt(<string>req.query.limit) || 5;
    const page = parseInt(<string>req.query.page) || 1;
    const offset =  (page-1)* limit;

    const transactionCollection = await Transaction.find({}).skip(offset).limit(limit);
    const transactionCollectionCount = await Transaction.count();

    const totalPage = Math.ceil(transactionCollectionCount/limit)

    return {
      data: transactionCollection,
      pagging: {
        total: transactionCollectionCount,
        page: page,
        pages: totalPage
      }
    }
  } catch (e) {
    return e
  }
}

export default { createTransaction, updateTransaction, deleteTransaction, getOneTransaction, getAllTransactions };