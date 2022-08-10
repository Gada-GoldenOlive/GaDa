import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomImage from './CustomImage';
import CloseIcon from '../constant/images/Close';

const CloseButton = props => {
  const { size = 24, handlePress, color = 'black' } = props;
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress || handleClick}>
      <View style={styles.backButton} {...props}>
        <CustomImage
          name="close"
          color={color}
          source={CloseIcon}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButton: {
    right: 16,
  },
  image: { width: 24, height: 24 },
});

export default CloseButton;
