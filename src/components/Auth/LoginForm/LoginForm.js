import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { styles } from './LoginForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.data';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { screen } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Usuario o contraseña incorrectos',
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
        placeholder='Correo electrónico'
        containerStyle={styles.input}
        value={formik.values.email}
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
      />
      <Input
        onChangeText={(text) => formik.setFieldValue('password', text)}
        value={formik.values.password}
        errorMessage={formik.errors.password}
        placeholder='Contraseña'
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type='material-community'
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title={'Iniciar Sesión'}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.submitForm}
        loading={formik.isSubmitting}
      />
    </View>
  );
};

export default LoginForm;
