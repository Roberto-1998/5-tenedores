import * as Yup from 'yup';

export const initialValues = () => {
  return {
    email: 'rcastellong98@gmail.com',
    password: '123456',
  };
};

export const validationSchema = () => {
  return Yup.object({
    email: Yup.string().email('El email no es correcto').required('El email es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe de tener un mínimo de 6 caracteres')
      .required('La contraseña es obligatoria'),
  });
};
