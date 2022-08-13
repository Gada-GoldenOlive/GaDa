import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { buttonColor } from '../constant/colors';
import { boldFontFamily } from '../constant/fonts';
import { bottomShadowStyle, windowWidth } from '../constant/styles';
import Text from './MyText';

const CustomButton = ({
  title = '다음',
  handlePress,
  backgroundColor,
  fontColor,
  style: containerStyle = null,
  textStyle = null,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.wrapper}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    paddingBottom: 33,
    backgroundColor: 'white',
    paddingTop: 14.5,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    ...bottomShadowStyle,
  },
  wrapper: {
    backgroundColor: buttonColor,
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: boldFontFamily,
    fontSize: 18,
    letterSpacing: -0.36,
    color: 'white',
  },
});
