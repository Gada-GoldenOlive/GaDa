import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import React from 'react';
import { mediumFontFamily } from '../constant/fonts';
import { bottomShadowStyle } from '../constant/styles';
import CustomImage from './CustomImage';
import Stop from '../constant/images/Stop';
import Text from './MyText';

const SubmitButton = ({
  text = '확인',
  version = 1,
  image = Stop,
  handlePress,
}) => {
  return version === 1 ? (
    <View style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.buttonWrapper2}>
        <CustomImage source={image} style={styles.image} />
        <Text style={styles.buttonText2}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
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

    ...bottomShadowStyle,
  },
  buttonWrapper2: {
    position: 'absolute',
    top: 61,
    right: 16,
    //zIndex: 100,
    flexDirection: 'row',
    paddingVertical: 7,
    // paddingEnd: 7,
    // paddingStart: 10,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...bottomShadowStyle,
  },
  buttonText: {
    fontFamily: mediumFontFamily,
    fontSize: 16,
    color: 'white',
  },
  buttonText2: {
    fontFamily: mediumFontFamily,
    fontSize: 16,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 1.5,
  },
});
