import { number, object, string } from "yup";

const productUpdateValidator = () => {
  return object({
    name: string().optional(),
    description: string().optional(),
    categoryId: string().uuid().optional(),
    quantity: number().positive().optional(),
    price: number().positive().optional(),
    threshold: number().positive().optional(),
    supplierInfo: string().optional(),
  });
};

export { productUpdateValidator };
