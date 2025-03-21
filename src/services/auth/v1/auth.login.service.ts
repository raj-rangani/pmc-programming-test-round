import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../../../db";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { loginUserValidator } from "../../../validators/auth/v1/auth.login.validator";
import { User } from "@prisma/client";

const loginAuth: RequestHandler = asyncHandler(async (req, res) => {
  const credentials = await loginUserValidator().validate(req.body);
  const user = await prisma.user.findFirst({
    where: { email: credentials.email },
  });

  if (!user) throw new ApiError(404, "User does not exists");
  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const token = generateAccessToken(user);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(new ApiResponse(200, { token }));
});

const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:
      (process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"]) ?? 120,
  });
};

export { generateAccessToken, loginAuth };
