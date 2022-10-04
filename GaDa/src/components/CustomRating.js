import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { starBackgroundColor, starColor } from '../constant/colors';
import StarIcon from '../constant/images/Star';
import CustomImage from './CustomImage';

const CustomRating = ({
  score,
  size,
  readonly = false,
  onPress,
  style: containerStyle,
  starMargin,
  tintColor,
}) => {
  const scoreList = [1, 2, 3, 4, 5];
  const handlePress = scr => {
    if (readonly) return null;
    onPress(scr);
    return null;
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {scoreList.map(scr => {
        return (
          <TouchableWithoutFeedback key={scr} onPress={() => handlePress(scr)}>
            <CustomImage
              resizeMode="contain"
              source={StarIcon}
              style={[
                styles.star,
                {
                  tintColor: score >= scr ? starColor : starBackgroundColor,
                },
                size && {
                  width: size,
                  height: size,
                },
                starMargin && {
                  marginRight: starMargin,
                },
              ]}
              tintColor={
                score >= scr ? tintColor || starColor : starBackgroundColor
              }
            />
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default CustomRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    marginRight: 3,
  },
});
