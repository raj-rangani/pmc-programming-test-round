import { number, object, string } from "yup";

const listProductValidator = () => {
  return object({
    page: number().default(1).required(),
    limit: number().default(5).required(),
    search: string().optional(),
    minPrize: number().positive().optional(),
    maxPrize: number().positive().optional(),
  });
};

export { listProductValidator };
