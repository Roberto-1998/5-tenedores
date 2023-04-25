import React from 'react';
import { Input, Icon, Button } from 'react-native-elements';
import { styles } from './RegisterForm.styles';
import { View } from 'react-native';
import { initialValues, validationSchema } from './RegisterForm.data';
import { useFormik } from 'formik';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { screen } from '../../../utils';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, formValue.email, formValue.password);

        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al registrarse, inténtelo más tarde',
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Correo electrónico'
        containerStyle={styles.input}
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />

      <Input
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
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder='Repetir Contraseña'
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
        onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        onPress={formik.handleSubmit}
        title={'Unirse'}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        loading={formik.isSubmitting}
      />
    </View>
  );
};

export default RegisterForm;
