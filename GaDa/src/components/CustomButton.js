import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { buttonColor } from '../constant/colors';
import { boldFontFamily } from '../constant/fonts';
import { bottomShadowStyle, topShadowStyle, windowWidth } from '../constant/styles';
import Text from './MyText';

const CustomButton = ({
  title = '다음',
  handlePress,
  backgroundColor,
  fontColor,
  clickable,
  style: containerStyle = null,
  textStyle = null,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[styles.wrapper, backgroundColor && { backgroundColor }]}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    paddingBottom: 33,
    backgroundColor: 'white',
    paddingTop: 14.5,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    ...topShadowStyle,
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
