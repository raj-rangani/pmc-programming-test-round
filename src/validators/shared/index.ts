import { string } from "yup";

const uuidValidator = () => string().uuid().required();

export { uuidValidator };
