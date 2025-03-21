import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ApiError } from "../../../utils/ApiError";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { listUserValidator } from "../../../validators/user/v1/user.list.validator";

const listUsers: RequestHandler = asyncHandler(async (req, res) => {
  const query = await listUserValidator().validate(req.query);

  if (!query.limit || !query.page) {
    throw new ApiError(400, "page or limit parameters are missing");
  }

  return prisma.$transaction(async (tx) => {
    const [users, count] = await Promise.all([
      tx.user.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: "desc" },
      }),
      tx.user.count(),
    ]);

    return res.status(200).json(new ApiResponse(200, users, count));
  });
});

export { listUsers };
