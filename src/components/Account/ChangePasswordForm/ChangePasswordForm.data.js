import * as Yup from 'yup';

export const initialValues = () => {
  return {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };
};

export const validationSchema = () => {
  return Yup.object({
    password: Yup.string()
      .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
      .required('La contraseña es requerida'),
    newPassword: Yup.string()
      .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
      .required('La contraseña es requerida')
      .oneOf([Yup.ref('newPassword')], 'Las nuevas contraseñas deben ser iguales'),
  });
};
