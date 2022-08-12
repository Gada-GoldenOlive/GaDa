import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import React from 'react';

import Text from '../../../components/MyText';
import NewPinButton from '../../../components/NewPinButton';

const HomeScreen = ({ isVisible, closeModal, openModal }) => {
  return (
    <View style={styles.container}>
      <NewPinButton />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
