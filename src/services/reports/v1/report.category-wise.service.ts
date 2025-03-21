import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

const categoryWiseStockReport: RequestHandler = asyncHandler(
  async (req, res) => {
    return prisma.$transaction(async (tx) => {
      const products = await prisma.product.groupBy({
        by: ["categoryId"],
        _sum: { quantity: true },
      });

      return res.status(200).json(new ApiResponse(200, products));
    });
  }
);

export { categoryWiseStockReport };
