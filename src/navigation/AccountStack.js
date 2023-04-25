import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen } from '../utils';
import { LoginScreen, AccountScreen, RegisterScreen } from '../screens/Account';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.account.account} component={AccountScreen} options={{ title: 'Cuenta' }} />
      <Stack.Screen name={screen.account.login} component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
      <Stack.Screen name={screen.account.register} component={RegisterScreen} options={{ title: 'Crea tu cuenta' }} />
    </Stack.Navigator>
  );
};

export default AccountStack;
