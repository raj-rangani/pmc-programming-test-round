import { User } from "@prisma/client";
import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/error.middlewares";

import authRouter from "./routes/auth/v1/auth.routes";
import categoryRouter from "./routes/category/v1/category.routes";
import productRouter from "./routes/product/v1/product.routes";
import userRouter from "./routes/user/v1/user.routes";
import reportsRouter from "./routes/reports/v1/reports.routes";

const app: Express = express();

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/reports", reportsRouter);

app.use(errorHandler);

export { app };
