import { RequestHandler } from "express";
import { prisma } from "../../../db";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { uuidValidator } from "../../../validators/shared";
import { userUpdateValidator } from "../../../validators/user/v1/user.update.validator";

const updateUser: RequestHandler = asyncHandler(async (req, res) => {
  const userId = await uuidValidator().validate(req.params.id);
  const body = await userUpdateValidator().validate(req.body);
  const updatedUser = prisma.user.update({
    where: { id: userId },
    data: { ...body },
  });

  return res.status(200).send(new ApiResponse(200, updatedUser));
});

export { updateUser };
