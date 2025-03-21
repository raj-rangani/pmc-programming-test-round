import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { categoryAddValidator } from "../../../validators/category/v1/category.add.validator";
import { ApiError } from "../../../utils/ApiError";

const addCategory: RequestHandler = asyncHandler(async (req, res) => {
  const { name, description } = await categoryAddValidator().validate(req.body);
  return prisma.$transaction(async (tx) => {
    const category = await tx.category.findUnique({ where: { name } });
    if (category) throw new ApiError(409, "Category name already exists.");

    const createdCategory = await tx.category.create({
      data: { name, description },
    });

    return res.status(201).json(new ApiResponse(201, createdCategory));
  });
});

export { addCategory };
