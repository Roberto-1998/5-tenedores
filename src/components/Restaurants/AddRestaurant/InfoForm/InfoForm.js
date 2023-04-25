import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './InfoForm.styles';
import { Input } from 'react-native-elements';
import { MapForm } from '../../../../components';

const InfoForm = ({ formik }) => {
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder='Nombre del restaurante'
          onChangeText={(text) => formik.setFieldValue('name', text)}
          errorMessage={formik.errors.name}
        />

        <Input
          placeholder='Dirección'
          rightIcon={{
            type: 'material-community',
            name: 'map-marker-radius',
            color: getColorIconMap(formik),
            onPress: onOpenCloseMap,
          }}
          onChangeText={(text) => formik.setFieldValue('address', text)}
          errorMessage={formik.errors.address}
        />
        <Input
          placeholder='Teléfono'
          onChangeText={(text) => formik.setFieldValue('phone', text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder='Email'
          onChangeText={(text) => formik.setFieldValue('email', text)}
          errorMessage={formik.errors.email}
        />

        <Input
          placeholder='Descripción del restaurante'
          multiline={true}
          inputContainerStyle={styles.textarea}
          onChangeText={(text) => formik.setFieldValue('description', text)}
          errorMessage={formik.errors.description}
        />
      </View>

      <MapForm formik={formik} show={showMap} close={onOpenCloseMap} />
    </>
  );
};

export default InfoForm;

const getColorIconMap = (formik) => {
  if (formik.errors.location) {
    return '#ff0000';
  }

  if (formik.values.location) {
    return '#00a680';
  }

  return '#c2c2c2';
};
