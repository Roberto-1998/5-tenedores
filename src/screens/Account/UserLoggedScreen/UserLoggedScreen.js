import React, { useState } from 'react';
import { View } from 'react-native';
import { InfoUser, AccountOptions } from '../../../components/Account';
import { styles } from './UserLoggedScreen.styles';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { LoadingModal } from '../../../components';

const UserLoggedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />

      <View style={styles.btnBox}>
        <Button
          title={'Cerrar sesión'}
          buttonStyle={styles.btnStyles}
          titleStyle={styles.btnTextStyles}
          onPress={logout}
        />
      </View>

      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
};

export default UserLoggedScreen;
