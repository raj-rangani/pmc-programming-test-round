import { Router } from "express";
import { registerAuth } from "../../../services/auth/v1/auth.register.service";
import { loginAuth } from "../../../services/auth/v1/auth.login.service";

const authRouter: Router = Router();

authRouter.route("/register").post(registerAuth);
authRouter.route("/login").post(loginAuth);

export default authRouter;
