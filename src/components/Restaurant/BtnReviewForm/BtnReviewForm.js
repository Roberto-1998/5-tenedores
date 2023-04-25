import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { styles } from './BtnReviewForm.styles';
import { useLoggedUser } from '../../../hooks/useLoggedUser';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { useUserReview } from '../../../hooks/useUserReview';

const BtnReviewForm = ({ idRestaurant }) => {
  const { hasLogged } = useLoggedUser();
  const { hasReview } = useUserReview(idRestaurant);
  const { navigate } = useNavigation();

  const goToLogin = () => {
    navigate(screen.account.tab, { screen: screen.account.login });
  };

  const goToAddReview = () => {
    navigate(screen.restaurant.addReviewRestaurant, { idRestaurant });
  };

  if (hasLogged && hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.textSendReview}>Ya has enviado un review a este restaurante</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title='Escribe una opinión'
          icon={{ type: 'material-community', color: '#00a680', name: 'square-edit-outline' }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Para escribir una opinión es necesario estar logueado{' '}
          <Text style={styles.textClick}> pulsa AQUI para iniciar sesión</Text>
        </Text>
      )}
    </View>
  );
};

export default BtnReviewForm;
