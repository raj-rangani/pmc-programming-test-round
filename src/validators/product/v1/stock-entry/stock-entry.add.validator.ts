import { TransactionType } from "@prisma/client";
import { number, object, string, mixed } from "yup";

const productStockEntryAddValidator = () => {
  return object({
    quantity: number().positive().required(),
    productId: string().uuid().required(),
    type: mixed<TransactionType>()
      .oneOf(Object.values(TransactionType))
      .required(),
  });
};

export { productStockEntryAddValidator };
