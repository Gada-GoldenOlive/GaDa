import { StyleSheet, View } from 'react-native';
import React from 'react';
import Pin from '../constant/images/Pin';
import CustomImage from './CustomImage';
import Text from './MyText';
import LinearGradient from 'react-native-linear-gradient';
import { MediumFontFamily } from '../constant/fonts';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { bottomShadowStyle } from '../constant/styles';

const NewPinButton = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('CreatePin');
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleNavigate}>
        <View style={styles.wrapper}>
          <LinearGradient
            colors={['rgb(64,209,126)', 'rgb(130,251,181)']}
            style={styles.linear}
          />
          <CustomImage source={Pin} style={styles.image} />
          <Text style={styles.text}>추가</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NewPinButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 18,
    bottom: 110,
    borderRadius: 100,
    ...bottomShadowStyle,
  },
  wrapper: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linear: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
  },
  image: {
    width: 32,
    height: 32,
    zIndex: 999,
  },
  text: {
    fontFamily: MediumFontFamily,
    fontSize: 11,
    letterSpacing: -0.22,
    color: 'white',
  },
});
