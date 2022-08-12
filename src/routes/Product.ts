import express from 'express';
import controller from '../controllers/Product.Controller';
import { ValidateSchema } from "../validator/ValidateSchema";
import { Schemas } from "../validator/Product.Validator";
const router = express.Router();

router.post('/', ValidateSchema(Schemas.product.create), controller.createProduct);
router.put('/:id', ValidateSchema(Schemas.product.update), controller.updateProduct);
router.get('/:id', controller.getOneProduct);
router.get('/', controller.getAllProducts);
router.delete('/:id', controller.deleteProduct);

export = router;