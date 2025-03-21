import { RequestHandler } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler";
import { prisma } from "../../../../db";
import { ApiResponse } from "../../../../utils/ApiResponse";
import { productStockEntryAddValidator } from "../../../../validators/product/v1/stock-entry/stock-entry.add.validator";
import { ApiError } from "../../../../utils/ApiError";
import { TransactionType } from "@prisma/client";

const addProductStockEntry: RequestHandler = asyncHandler(async (req, res) => {
  const body = await productStockEntryAddValidator().validate(req.body);
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: body.productId },
    });

    if (!product) throw new ApiError(400, "Product not found");

    if (
      product.quantity - body.quantity < 0 &&
      body.type === TransactionType.reduction
    ) {
      throw new ApiError(400, "Cannot able to reduce the stock (too low)");
    }

    const createdEntry = await tx.stockTransaction.create({
      data: {
        quantityChange: body.quantity,
        transactionDate: new Date(),
        transactionType: body.type,
        product: { connect: { id: body.productId } },
      },
    });

    await tx.product.update({
      where: { id: body.productId },
      data: {
        quantity:
          body.type === TransactionType.addition
            ? { increment: body.quantity }
            : { decrement: body.quantity },
      },
    });

    return res.status(201).json(new ApiResponse(201, createdEntry));
  });
});

export { addProductStockEntry };
