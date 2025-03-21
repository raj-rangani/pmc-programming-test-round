import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { uuidValidator } from "../../../validators/shared";

const getCategoryById: RequestHandler = asyncHandler(async (req, res) => {
  const categoryId = await uuidValidator().validate(req.params.id);
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  return res.status(200).json(new ApiResponse(200, category));
});

export { getCategoryById };
