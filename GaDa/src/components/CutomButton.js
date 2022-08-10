import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import Text from './MyText';
import { borderColor } from '../constant/colors';
import { mediumFontFamily } from '../constant/fonts';

const CustomButton = ({
  title = '',
  subTitle = '',
  handlePress,
  backgroundColor,
  fontColor,
  style: containerStyle = null,
  textStyle = null,
  subTitleStyle = {},
}) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.buttonWrapper,
          backgroundColor === 'white' && { borderWidth: 1 },
          backgroundColor && { backgroundColor },
          containerStyle && containerStyle,
        ]}
      >
        <Text
          style={[textStyle && textStyle, fontColor && { color: fontColor }]}
        >
          {title}
        </Text>
        {subTitle.length >= 1 && (
          <Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  subTitle: {
    fontFamily: mediumFontFamily,
    fontSize: 12,
    color: 'white',
  },
});
