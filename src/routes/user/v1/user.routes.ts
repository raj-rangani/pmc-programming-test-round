import { Router } from "express";
import { deleteUser } from "../../../services/user/v1/user.delete.service";
import { getUserById } from "../../../services/user/v1/user.get.service";
import { listUsers } from "../../../services/user/v1/user.list.service";
import { updateUser } from "../../../services/user/v1/user.update.service";
import {
  verifyJwt,
  verifyPermission,
} from "../../../middlewares/auth.middlewares";
import { UserRole } from "@prisma/client";

const userRouter: Router = Router();

userRouter
  .route("/")
  .get(verifyJwt, verifyPermission([UserRole.admin]), listUsers);

userRouter
  .route("/:id")
  .get(verifyJwt, verifyPermission([UserRole.admin]), getUserById);

userRouter
  .route("/:id")
  .put(verifyJwt, verifyPermission([UserRole.admin]), updateUser);

userRouter
  .route("/:id")
  .delete(verifyJwt, verifyPermission([UserRole.admin]), deleteUser);

export default userRouter;
