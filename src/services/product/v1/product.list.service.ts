import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { listProductValidator } from "../../../validators/product/v1/product.list.validator";
import { Prisma } from "@prisma/client";

const listProducts: RequestHandler = asyncHandler(async (req, res) => {
  const query = await listProductValidator().validate(req.query);

  if (!query.limit || !query.page) {
    throw new ApiError(400, "page or limit parameters are missing");
  }

  return prisma.$transaction(async (tx) => {
    let where: Prisma.ProductWhereInput[] = [];

    if (query.search) {
      where.push({
        OR: [
          { name: { contains: query.search, mode: "insensitive" } },
          {
            category: {
              name: { contains: query.search, mode: "insensitive" },
            },
          },
        ],
      });
    }

    if (query.minPrize) where.push({ price: { gte: query.minPrize } });
    if (query.maxPrize) where.push({ price: { lte: query.maxPrize } });

    const [products, count] = await Promise.all([
      tx.product.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { name: "asc" },
        where: { AND: where },
      }),
      tx.product.count({ where: { AND: where } }),
    ]);

    return res.status(200).json(new ApiResponse(200, products, count));
  });
});

export { listProducts };
