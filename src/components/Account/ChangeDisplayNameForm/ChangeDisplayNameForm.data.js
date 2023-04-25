import * as Yup from 'yup';

export const initialValues = () => {
  return {
    displayName: '',
  };
};

export const validationSchema = () => {
  return Yup.object({
    displayName: Yup.string().required('El nombre y apellidos son requeridos'),
  });
};
