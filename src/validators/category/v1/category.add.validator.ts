import { object, string } from "yup";

const categoryAddValidator = () => {
  return object({
    name: string().required(),
    description: string().optional(),
  });
};

export { categoryAddValidator };
