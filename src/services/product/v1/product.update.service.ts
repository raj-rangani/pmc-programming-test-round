import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { productUpdateValidator } from "../../../validators/product/v1/product.update.validator";
import { uuidValidator } from "../../../validators/shared";

const updateProduct: RequestHandler = asyncHandler(async (req, res) => {
  const productId = await uuidValidator().validate(req.params.id);
  const body = await productUpdateValidator().validate(req.body);
  const updatedProduct = prisma.product.update({
    where: { id: productId },
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

  return res.status(200).send(new ApiResponse(200, updatedProduct));
});

export { updateProduct };
