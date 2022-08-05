import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { boldFontFamily } from '../../constant/fonts';
import {
  borderColor,
  descriptionColor,
  blackColor,
} from '../../constant/colors';
import Text from '../MyText';

const PagerTabButton = ({
  isFocused = false,
  handlePress,
  title,
  buttonWidth = 20,
}) => {
  const borderEmphasisStyle = {
    borderBottomColor: blackColor,
    borderBottomWidth: 2,
  };
  const textEmphasisStyle = {
    fontFamily: boldFontFamily,
    color: blackColor,
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.titleWrapper,
          isFocused && borderEmphasisStyle,
          buttonWidth && { minWidth: buttonWidth },
        ]}
      >
        <Text style={[styles.title, isFocused && textEmphasisStyle]}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PagerTabButton;

const styles = StyleSheet.create({
  titleWrapper: {
    flex: 1,

    paddingTop: 22,
    paddingBottom: 13,
    // paddingHorizontal: 12,
    // paddingVertical: 22,

    alignItems: 'center',
    justifyContent: 'center',

    borderColor: borderColor,
    borderBottomWidth: 1,
  },
  title: {
    // fontFamily: boldFontFamily,
    color: descriptionColor,
  },
});
