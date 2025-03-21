import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { uuidValidator } from "../../../validators/shared";

const getUserById: RequestHandler = asyncHandler(async (req, res) => {
  const userId = await uuidValidator().validate(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return res.status(200).json(new ApiResponse(200, user));
});

export { getUserById };
