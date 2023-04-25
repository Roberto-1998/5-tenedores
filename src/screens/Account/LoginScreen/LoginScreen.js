import { ScrollView, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import React from 'react';
import { styles } from './LoginScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { LoginForm } from '../../../components/Auth';

const LoginScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ScrollView>
      <Image source={require('../../../../assets/img/5-tenedores-letras-icono-logo.png')} style={styles.image} />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta?{' '}
          <Text onPress={() => navigate(screen.account.register)} style={styles.btnRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
