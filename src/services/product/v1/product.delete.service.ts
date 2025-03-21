import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { uuidValidator } from "../../../validators/shared";

const deleteProduct: RequestHandler = asyncHandler(async (req, res) => {
  const productId = await uuidValidator().validate(req.params.id);
  await prisma.product.delete({ where: { id: productId } });
  return res.status(204).send(new ApiResponse(204));
});

export { deleteProduct };
