import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { Sample } from '../../../constant/images/Temp';
import CustomRating from '../../../components/CustomRating';
import { boldFontFamily } from '../../../constant/fonts';
import { buttonColor, defaultColor } from '../../../constant/colors';
import Text from '../../../components/MyText';

const Review = ({ review }) => {
  const { content, id, image, star, title, userId, userName, vehicle } = review;
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <CustomImage source={Sample} style={styles.image} />
        <View style={styles.informationWrapper}>
          <Text style={styles.name}>{userName}</Text>
          <CustomRating
            style={styles.rating}
            readonly
            size={11}
            score={star}
            starMargin={2.6}
          />
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.content} numberOfLines={3}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  userContainer: {
    marginBottom: 13,
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  informationWrapper: {
    marginStart: 9,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontFamily: boldFontFamily,
    fontSize: 13,
    letterSpacing: -0.26,
    color: defaultColor,
  },
  rating: {
    justifyContent: 'flex-start',
  },
  content: {
    lineHeight: 22,
    letterSpacing: -0.28,
  },
});
