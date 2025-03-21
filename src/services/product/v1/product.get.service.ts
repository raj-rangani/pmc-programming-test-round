import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { uuidValidator } from "../../../validators/shared";

const getProductById: RequestHandler = asyncHandler(async (req, res) => {
  const productId = await uuidValidator().validate(req.params.id);
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  return res.status(200).json(new ApiResponse(200, product));
});

const getLowStockProducts: RequestHandler = asyncHandler(async (req, res) => {
  const products =
    await prisma.$queryRaw`SELECT * FROM "products" WHERE "quantity" <= "threshold"`;

  return res.status(200).json(new ApiResponse(200, products));
});

const getOutOfStockProducts: RequestHandler = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    where: { quantity: { lte: 0 } },
  });

  return res.status(200).json(new ApiResponse(200, products));
});

export { getProductById, getLowStockProducts, getOutOfStockProducts };
