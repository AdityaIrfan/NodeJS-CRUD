import express from "express";
import controller from '../controllers/Transaction.Controller';
import { ValidateSchema } from "../validator/ValidateSchema";
import { Schemas } from "../validator/Transaction.Validator";

const router = express.Router();

router.post('/', ValidateSchema(Schemas.transaction.create), controller.createTransaction);
router.put('/:id', ValidateSchema(Schemas.transaction.update), controller.updateTransaction);
router.delete('/:id', controller.deleteTransaction);
router.get('/:id', controller.getOneTransaction);
router.get('/', controller.getAllTransaction);

export = router;

