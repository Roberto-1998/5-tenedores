import { NavigationContainer } from '@react-navigation/native';
import { initFirebase } from './src/utils';
import AppNavigation from './src/navigation/AppNavigation';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import 'react-native-get-random-values';
import { useEffect } from 'react';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

      <Toast />
    </>
  );
}
