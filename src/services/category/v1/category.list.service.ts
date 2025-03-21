import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { listCategoryValidator } from "../../../validators/category/v1/category.list.validator";

const listCategories: RequestHandler = asyncHandler(async (req, res) => {
  const query = await listCategoryValidator().validate(req.query);

  if (!query.limit || !query.page) {
    throw new ApiError(400, "page or limit parameters are missing");
  }

  return prisma.$transaction(async (tx) => {
    const [categories, count] = await Promise.all([
      tx.category.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: "desc" },
      }),
      tx.category.count(),
    ]);

    return res.status(200).json(new ApiResponse(200, categories, count));
  });
});

export { listCategories };
