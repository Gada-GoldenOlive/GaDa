import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { heart, heartClicked } from '../constant/images/Heart';
import CustomImage from './CustomImage';
import { createLikedReview, deleteLikedReview } from '../APIs/review';

const FeedBookmark = ({ like, id }) => {
  const [isClicked, setIsClicked] = useState(like);
  const [heartImage, setHeartImage] = useState(heart);
  
  const handleClick = async () => {
    if (isClicked) {
      const res = await deleteLikedReview(id);
      if (res.code === 201) {
        setIsClicked(false);
      }
    } else {
      const res = await createLikedReview(id);
      if (res.code === 201) {
        setIsClicked(true);
      }
    }
  };
  useEffect(() => {
    if (isClicked) {
      setHeartImage(heartClicked);
    } else {
      setHeartImage(heart);
    }
  }, [isClicked, like]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleClick}>
        <CustomImage
          source={heartImage}
          style={styles.heart}
          tintColor="white"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default React.memo(FeedBookmark);

const styles = StyleSheet.create({
  heart: {
    width: 24,
    height: 24,
  },
});
