import { RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { uuidValidator } from "../../../validators/shared";

const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
  const userId = await uuidValidator().validate(req.params.id);
  await prisma.user.delete({ where: { id: userId } });
  return res.status(204).send(new ApiResponse(204));
});

export { deleteUser };
