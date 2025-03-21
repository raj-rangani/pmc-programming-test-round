import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { UserRole } from "@prisma/client";

const verifyJwt: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.findFirst({
      where: { id: (decodedToken as any).id },
    });

    if (!user) throw new ApiError(401, "Invalid access token");
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export const verifyPermission = (roles: UserRole[] = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user?.id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not allowed to perform this action");
    }
  });

export { verifyJwt };
