import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Icon, Avatar, Text } from 'react-native-elements';
import { styles } from './UploadImageForm.styles';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LoadingModal } from '../../../shared';
import { FlatList } from 'react-native';
import { filter } from 'lodash';

const UploadImageForm = ({ formik }) => {
  const [isLoading, setIsLoading] = useState(false);

  /* Obtener imagen de la galeria */
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);

      uploadImage(result.uri);
    }
  };

  /* Subir imagen a firebase Storage */
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${Math.random()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotosRestaurant(snapshot.metadata.fullPath);
    });
  };

  const updatePhotosRestaurant = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);
    formik.setFieldValue('images', [...formik.values.images, imageUrl]);
    setIsLoading(false);
  };

  const removeImage = (img) => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estás seguro de eliminar esta imagen?.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            const result = filter(formik.values.images, (image) => image !== img);
            formik.setFieldValue('images', result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.viewImage}>
        <Icon
          onPress={openGallery}
          type='material-community'
          name='camera'
          color={'#a7a7a7'}
          containerStyle={styles.containerIcon}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={formik.values.images}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Avatar
              onPress={() => removeImage(item)}
              key={item}
              source={{ uri: item }}
              containerStyle={styles.imageStyle}
            />
          )}
        />
      </View>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text={'Subiendo imagen'} />
    </>
  );
};

export default UploadImageForm;
