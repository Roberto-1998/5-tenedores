import React from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { styles } from './Modal.styles';

const Modal = ({ show, close, children }) => {
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
      {children}
    </Overlay>
  );
};

export default Modal;
