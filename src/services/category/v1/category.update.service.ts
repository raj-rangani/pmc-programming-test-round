import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { categoryUpdateValidator } from "../../../validators/category/v1/category.update.validator";
import { uuidValidator } from "../../../validators/shared";

const updateCategory: RequestHandler = asyncHandler(async (req, res) => {
  const categoryId = await uuidValidator().validate(req.params.id);
  const body = await categoryUpdateValidator().validate(req.body);
  const updatedCategory = prisma.category.update({
    where: { id: categoryId },
    data: { ...body },
  });

  return res.status(200).send(new ApiResponse(200, updatedCategory));
});

export { updateCategory };
