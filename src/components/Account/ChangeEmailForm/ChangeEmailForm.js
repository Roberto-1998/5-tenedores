import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './ChangeEmailForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeEmailForm.data';
import Toast from 'react-native-toast-message';
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const ChangeEmailForm = ({ onClose, onReload }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(currentUser.email, formValue.password);

        reauthenticateWithCredential(currentUser, credentials);

        await updateEmail(currentUser, formValue.email);
        onReload();
        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al cambiar el email',
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Nuevo email'
        rightIcon={{ type: 'material-community', name: 'at', color: '#c2c2c2' }}
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder='Contraseña'
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => setShowPassword(!showPassword),
        }}
        secureTextEntry={showPassword ? false : true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Button
        onPress={formik.submitForm}
        loading={formik.isSubmitting}
        title={'Cambiar email'}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
    </View>
  );
};

export default ChangeEmailForm;
