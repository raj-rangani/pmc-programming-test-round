import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

const totalStockValueReport: RequestHandler = asyncHandler(async (req, res) => {
  return prisma.$transaction(async (tx) => {
    const totalValue = await prisma.product.aggregate({
      _sum: { price: true },
    });

    return res.status(200).json(new ApiResponse(200, totalValue));
  });
});

export { totalStockValueReport };
