import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiError } from "../../../utils/ApiError";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { registerUserValidator } from "../../../validators/auth/v1/auth.register.validator";

const registerAuth: RequestHandler = asyncHandler(async (req, res) => {
  const registration = await registerUserValidator().validate(req.body);
  const user = await prisma.user.findUnique({
    where: { email: registration.email },
  });

  if (user) throw new ApiError(409, "User with this email already exists");
  const addedUser = await prisma.user.create({
    data: {
      name: registration.name,
      email: registration.email,
      password: await bcrypt.hash(registration.password, 10),
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(201).json(new ApiResponse(201, addedUser));
});

export { registerAuth };
