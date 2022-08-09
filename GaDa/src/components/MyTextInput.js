import React, { forwardRef } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { descriptionColor } from '../constant/colors';

const MyTextInput = forwardRef((props, ref) => {
  const {
    style: textInputStyle = {},
    placeholder = '직접입력:',
    ...restProps
  } = props;
  return (
    <TextInput
      style={[styles.textInput, textInputStyle]}
      textAlignVertical="top"
      placeholder={placeholder}
      placeholderTextColor={descriptionColor}
      {...restProps}
      ref={ref}
    />
  );
});

export default MyTextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingTop: 19.5,
    paddingBottom: 17.5,
    color: 'rgb(158,158,158)',
    letterSpacing: -0.32,
    fontSize: 16,
    borderBottomColor: 'rgb(232,232,232)',
    borderBottomWidth: 1,
    width: '100%',
  },
});
