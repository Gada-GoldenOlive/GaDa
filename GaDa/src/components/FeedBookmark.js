import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { heart, heartClicked } from '../constant/images/Heart';
import CustomImage from './CustomImage';
import { useState } from 'react';

const FeedBookmark = () => {
    const [isClicked, setIsClicked] = useState(false);
    const heartImage = isClicked ? heartClicked : heart;

    const handleClick = () => {
        setIsClicked(!isClicked);
    }
  return (
    <View>
      <TouchableWithoutFeedback onPress={handleClick}>
        <CustomImage source={heartImage} style={styles.heart} tintColor="white" />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FeedBookmark;

const styles = StyleSheet.create({
  heart: {
    width: 24,
    height: 24,
  },
});
