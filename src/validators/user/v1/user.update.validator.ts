import { object, string } from "yup";

const userUpdateValidator = () => {
  return object({
    name: string().optional(),
  });
};

export { userUpdateValidator };
