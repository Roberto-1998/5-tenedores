import * as Yup from 'yup';

export const initialValues = () => {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
};

export const validationSchema = () => {
  return Yup.object({
    email: Yup.string().email('El email no es correcto').required('El email es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe de tener un mínimo de 6 caracteres')
      .required('La contraseña es obligatoria'),
    repeatPassword: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe de tener un mínimo de 6 caracteres')
      .oneOf([Yup.ref('password')], 'Las contraseñas tienen que ser iguales'),
  });
};
