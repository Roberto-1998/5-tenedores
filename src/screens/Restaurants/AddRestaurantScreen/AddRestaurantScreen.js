import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './AddRestaurantScreen.styles';
import { ImageRestaurant, InfoForm, UploadImageForm } from '../../../components';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddRestaurantScreen.data';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { useNavigation } from '@react-navigation/native';

const AddRestaurantScreen = () => {
  const { goBack } = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = Math.random().toString();
        newData.createdAt = new Date();

        const myDb = doc(db, 'restaurants', newData.id);
        await setDoc(myDb, newData);
        goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />

      <UploadImageForm formik={formik} />

      <Button
        title={'Crear restaurante'}
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
};

export default AddRestaurantScreen;
