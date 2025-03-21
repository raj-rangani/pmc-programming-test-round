import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { productAddValidator } from "../../../validators/product/v1/product.add.validator";

const addProduct: RequestHandler = asyncHandler(async (req, res) => {
  const body = await productAddValidator().validate(req.body);
  return prisma.$transaction(async (tx) => {
    const createdProduct = await tx.product.create({
      data: {
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        threshold: body.threshold,
        description: body.description,
        supplierInfo: body.supplierInfo,
        category: { connect: { id: body.categoryId } },
      },
    });

    return res.status(201).json(new ApiResponse(201, createdProduct));
  });
});

export { addProduct };
