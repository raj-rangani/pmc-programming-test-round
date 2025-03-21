import { object, string } from "yup";

const loginUserValidator = () => {
  return object({
    email: string().email().required(),
    password: string()
      .min(8, "Your password should be 8 character long.")
      .max(20, "Your password should not exceed 20 characters.")
      .required(),
  });
};

export { loginUserValidator };
