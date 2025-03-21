import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { uuidValidator } from "../../../validators/shared";

const deleteCategory: RequestHandler = asyncHandler(async (req, res) => {
  const categoryId = await uuidValidator().validate(req.params.id);
  await prisma.category.delete({ where: { id: categoryId } });
  return res.status(204).send(new ApiResponse(204));
});

export { deleteCategory };
