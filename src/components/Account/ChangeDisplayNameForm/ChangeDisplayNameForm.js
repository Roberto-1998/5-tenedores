import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './ChangeDisplayNameForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeDisplayNameForm.data';
import { getAuth, updateProfile } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const ChangeDisplayNameForm = ({ onClose, onReload }) => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName });
        /* Con este onReload hacemos que se repinte el componente UserLoggedScreen al cambiar ese estado del componente, para poder ver en tiempo real el nombre actualizado  */
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al cambiar el nombre y apellidos',
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Nombre y apellidos'
        rightIcon={{ type: 'material-community', name: 'account-circle-outline', color: '#c2c2c2' }}
        value={formik.values.displayName}
        onChangeText={(text) => formik.setFieldValue('displayName', text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title={'Cambiar Nombre y apellidos'}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.submitForm}
        loading={formik.isSubmitting}
      />
    </View>
  );
};

export default ChangeDisplayNameForm;
