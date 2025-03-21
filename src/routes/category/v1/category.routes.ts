import { Router } from "express";
import { addCategory } from "../../../services/category/v1/category.create.service";
import { deleteCategory } from "../../../services/category/v1/category.delete.service";
import { getCategoryById } from "../../../services/category/v1/category.get.service";
import { listCategories } from "../../../services/category/v1/category.list.service";
import { updateCategory } from "../../../services/category/v1/category.update.service";
import {
  verifyJwt,
  verifyPermission,
} from "../../../middlewares/auth.middlewares";
import { UserRole } from "@prisma/client";

const categoryRouter: Router = Router();

categoryRouter
  .route("/")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    listCategories
  );

categoryRouter
  .route("/:id")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    getCategoryById
  );

categoryRouter
  .route("/")
  .post(verifyJwt, verifyPermission([UserRole.admin]), addCategory);

categoryRouter
  .route("/:id")
  .put(verifyJwt, verifyPermission([UserRole.admin]), updateCategory);

categoryRouter
  .route("/:id")
  .delete(verifyJwt, verifyPermission([UserRole.admin]), deleteCategory);

export default categoryRouter;
