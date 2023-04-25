import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { styles } from './UserGuestScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';

const UserGuestScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ScrollView
      centerContent={true}
      style={styles.content}
      /*  contentContainerStyle={{ flex: 1, justifyContent: 'center' }} */
    >
      <Image source={require('../.././../../assets/img/user-guest.png')} style={styles.image} />
      <Text style={styles.title}>Consultar tu perfil de 5 Tenedores</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante?. Busca y visualiza los mejores restaurantes de una forma sencilla, vota
        cual te ha gustado más y comenta cómo ha sido tu experiencia.
      </Text>

      <Button title={'Ver tu perfil'} onPress={() => navigate(screen.account.login)} buttonStyle={styles.btnStyle} />
    </ScrollView>
  );
};

export default UserGuestScreen;
