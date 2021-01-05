import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().min(2).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});
