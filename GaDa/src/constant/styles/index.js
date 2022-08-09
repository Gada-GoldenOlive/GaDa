import { Dimensions } from 'react-native';
import { borderColor } from '../colors';

export const { width: windowWidth, height: windowHeight } =
  Dimensions.get('window');

export const defaultTouchableOpacity = 1.0;

export const buttonStyle = {
  borderWidth: 1,

  borderRadius: 3,
  borderColor,
  backgroundColor: 'white',

  alignItems: 'center',
  justifyContent: 'center',
};

export const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};

export const tagStyle = {
  borderRadius: 3,
  backgroundColor: 'rgb(244,244,244)',
  alignItems: 'center',
  justifyContent: 'center',
};

export const iconStyle = {
  width: 22,
  height: 22,
};

export const mainImageSizeStyle = {
  width: 200,
  height: 200,
};

export const otherImageSize = 117;
export const otherImageSizeStyle = {
  width: otherImageSize,
  height: otherImageSize,
};

export const feedImageSizeStyle = {
  width: 339,
  height: 339,
};

export const largeProfileStyle = {
  width: 55,
  height: 55,
};

export const smallProfileStyle = {
  width: 45,
  height: 45,
};

export const defaultBorderRadius = 6;

export const defaultPaddingHorizontal = 16;