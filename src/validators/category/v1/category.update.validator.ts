import { object, string } from "yup";

const categoryUpdateValidator = () => {
  return object({
    name: string().optional(),
    description: string().optional(),
  });
};

export { categoryUpdateValidator };
