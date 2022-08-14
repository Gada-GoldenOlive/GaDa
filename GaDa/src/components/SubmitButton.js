import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { mediumFontFamily } from '../constant/fonts';
import { bottomShadowStyle } from '../constant/styles';
import CustomImage from './CustomImage';
import Stop from '../constant/images/Stop';
const SubmitButton = ({
  text = '확인',
  version = 1,
  image = Stop,
  style: containerStyle,
  textStyle,
}) => {
  return version === 1 ? (
    <View style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  ) : (
    <View style={[styles.buttonWrapper, containerStyle]}>
      <CustomImage source={image} style={styles.image} />
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </View>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    top: 61,
    right: 16,
    //zIndex: 100,

    paddingVertical: 7,
    paddingHorizontal: 23,
    borderRadius: 17,

    backgroundColor: '#49d492',
    flexDirection: 'row',

    ...bottomShadowStyle,
  },
  buttonText: {
    fontFamily: mediumFontFamily,
    fontSize: 16,
    color: 'white',
  },
  image: {
    width: 20,
    height: 20,
  },
});
