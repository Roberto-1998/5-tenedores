import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './ChangePasswordForm.styles';
import { Input, Button } from 'react-native-elements';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangePasswordForm.data';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const ChangePasswordForm = ({ onClose }) => {
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

        await updatePassword(currentUser, formValue.newPassword);
        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al cambiar contraseña',
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Contraseña actual'
        containerStyle={styles.Input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          color: '#c2c2c2',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          onPress: () => setShowPassword(!showPassword),
        }}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder='Nueva contraseña'
        containerStyle={styles.Input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          color: '#c2c2c2',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          onPress: () => setShowPassword(!showPassword),
        }}
        value={formik.values.newPassword}
        onChangeText={(text) => formik.setFieldValue('newPassword', text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder='Repetir contraseña'
        containerStyle={styles.Input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          color: '#c2c2c2',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          onPress: () => setShowPassword(!showPassword),
        }}
        value={formik.values.confirmPassword}
        onChangeText={(text) => formik.setFieldValue('confirmPassword', text)}
        errorMessage={formik.errors.confirmPassword}
      />
      <Button
        onPress={formik.submitForm}
        loading={formik.isSubmitting}
        title={'Cambiar contraseña'}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
    </View>
  );
};

export default ChangePasswordForm;
