import { Express } from "express";
import productRoutes from "./Product";
import transactionRoutes from "./Transaction";

const Routes = (router: Express) => {
  router.use('/v1/product', productRoutes);
  router.use('/v1/transaction', transactionRoutes);
}

export default Routes;