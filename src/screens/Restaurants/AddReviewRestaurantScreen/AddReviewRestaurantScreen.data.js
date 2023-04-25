import * as Yup from 'yup';

export const initialValues = () => {
  return {
    rating: 3,
    title: '',
    comment: '',
  };
};

export const validationSchema = () => {
  return Yup.object({
    title: Yup.string().required('El título es requerido'),
    comment: Yup.string().required('El comentario es requerido'),
    rating: Yup.number().required('La calificación es requerida'),
  });
};
