import { useLoggedUser } from '../../hooks/useLoggedUser';
import { UserGuestScreen, UserLoggedScreen } from './index';
import { LoadingModal } from '../../components';

const AccountScreen = () => {
  const { hasLogged } = useLoggedUser();

  if (hasLogged === null) {
    return <LoadingModal show text={'Cargando'} />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
};

export default AccountScreen;
