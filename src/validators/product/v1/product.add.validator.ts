import { number, object, string } from "yup";

const productAddValidator = () => {
  return object({
    name: string().required(),
    description: string().required(),
    categoryId: string().uuid().required(),
    quantity: number().positive().required(),
    price: number().positive().required(),
    supplierInfo: string().optional(),
    threshold: number().positive().required(),
  });
};

export { productAddValidator };
