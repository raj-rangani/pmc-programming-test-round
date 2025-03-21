import { Router } from "express";
import {
  verifyJwt,
  verifyPermission,
} from "../../../middlewares/auth.middlewares";
import { UserRole } from "@prisma/client";
import { totalStockValueReport } from "../../../services/reports/v1/report.stock-value.service";
import { categoryWiseStockReport } from "../../../services/reports/v1/report.category-wise.service";

const reportsRouter: Router = Router();

reportsRouter
  .route("/total-stock-value")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    totalStockValueReport
  );

reportsRouter
  .route("/category-wise")
  .get(
    verifyJwt,
    verifyPermission([UserRole.admin, UserRole.user]),
    categoryWiseStockReport
  );

export default reportsRouter;
