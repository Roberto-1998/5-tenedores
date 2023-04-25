import { View, Text } from 'react-native';
import React from 'react';
import { screen } from '../../../utils';
import { styles } from './RestaurantsScreen.styles';
import { Icon } from 'react-native-elements';
import { useLoggedUser, useRestaurants } from '../../../hooks';
import { LoadingModal, ListRestaurants } from '../../../components';

const RestaurantsScreen = ({ navigation }) => {
  const { hasLogged } = useLoggedUser();
  const { loading, restaurants } = useRestaurants();

  const goToAddRestaurant = () => {
    /* Esta navegación funciona pero cuando stamos en el mismo Stack */
    /*  navigation.navigate(screen.restaurant.addRestaurant); */

    /* Aún así lo bajos a hacer como la de abajo para practicar y evitar errores */
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.addRestaurant,
    });

    /* Cuando queremos viajar a una pagina de otro Stack (Ejemplo Account) */
    /*  navigation.navigate(screen.account.tab, { screen: screen.account.account }); */
  };

  return (
    <View style={styles.content}>
      {loading ? <LoadingModal show text={'Cargando'} /> : <ListRestaurants restaurants={restaurants} />}

      {hasLogged && (
        <Icon
          reverse
          type='material-community'
          name='plus'
          color={'#00a680'}
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
};

export default RestaurantsScreen;
