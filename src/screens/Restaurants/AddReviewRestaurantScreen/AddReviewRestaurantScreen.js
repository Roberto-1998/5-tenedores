import React from 'react';
import { View } from 'react-native';
import { AirbnbRating, Input, Button } from 'react-native-elements';
import { styles } from './AddReviewRestaurantScreen.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddReviewRestaurantScreen.data';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, query, collection, where, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils';
import { map, mean } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const AddReviewRestaurantScreen = ({ route }) => {
  const { goBack } = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = Math.random().toString();
        const newData = formValue;
        newData.id = idDoc;
        newData.idRestaurant = route.params.idRestaurant;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();
        await setDoc(doc(db, 'reviews', idDoc), newData);

        await updateRestaurant();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al enviar la review',
        });
      }
    },
  });

  const updateRestaurant = async () => {
    const q = query(collection(db, 'reviews'), where('idRestaurant', '==', route.params.idRestaurant));

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStarts = map(reviews, (review) => review.data().rating);
      const media = mean(arrayStarts);

      const restaurantRef = doc(db, 'restaurants', route.params.idRestaurant);

      await updateDoc(restaurantRef, {
        ratingMedia: media,
      });

      goBack();
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.content}>
        <View>
          <View style={styles.ratingContent}>
            <AirbnbRating
              count={5}
              reviews={['Pésimo', 'Deficiente', 'Normal', 'Muy Bueno', 'Excelente']}
              defaultRating={formik.values.rating}
              size={35}
              onFinishRating={(rating) => formik.setFieldValue('rating', rating)}
            />
          </View>

          <View>
            <Input
              placeholder='Título'
              onChangeText={(text) => formik.setFieldValue('title', text)}
              errorMessage={formik.errors.title}
            />
            <Input
              placeholder='Comentario'
              multiline
              inputContainerStyle={styles.comment}
              onChangeText={(text) => formik.setFieldValue('comment', text)}
              errorMessage={formik.errors.comment}
            />
          </View>
        </View>
        <Button
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          title={'Enviar review'}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddReviewRestaurantScreen;
