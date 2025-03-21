import { Router } from "express";
import { addProduct } from "../../../services/product/v1/product.create.service";
import { deleteProduct } from "../../../services/product/v1/product.delete.service";
import {
  getLowStockProducts,
  getOutOfStockProducts,
  getProductById,
} from "../../../services/product/v1/product.get.service";
import { listProducts } from "../../../services/product/v1/product.list.service";
import { updateProduct } from "../../../services/product/v1/product.update.service";
import {
  verifyJwt,
  verifyPermission,
} from "../../../middlewares/auth.middlewares";
import { UserRole } from "@prisma/client";
import { addProductStockEntry } from "../../../services/product/v1/stock-entry/stock-entry.add.service";

const productRouter: Router = Router();

productRouter
  .route("/")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    listProducts
  );

productRouter
  .route("/:id")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    getProductById
  );

productRouter
  .route("/")
  .post(verifyJwt, verifyPermission([UserRole.admin]), addProduct);

productRouter
  .route("/:id")
  .put(verifyJwt, verifyPermission([UserRole.admin]), updateProduct);

productRouter
  .route("/:id")
  .delete(verifyJwt, verifyPermission([UserRole.admin]), deleteProduct);

productRouter
  .route("/stock")
  .post(verifyJwt, verifyPermission([UserRole.admin]), addProductStockEntry);

productRouter
  .route("/stock/low")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    getLowStockProducts
  );

productRouter
  .route("/stock/out-of-stock")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    getOutOfStockProducts
  );

export default productRouter;
