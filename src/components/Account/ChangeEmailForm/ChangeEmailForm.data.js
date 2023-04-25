import * as Yup from 'yup';

export const initialValues = () => {
  return {
    email: '',
    password: '',
  };
};

export const validationSchema = () => {
  return Yup.object({
    email: Yup.string().email('El email debe ser válido').required('El nuevo email es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
      .required('La contraseña es requerida'),
  });
};
