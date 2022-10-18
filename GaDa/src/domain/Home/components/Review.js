import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { Sample } from '../../../constant/images/Temp';
import CustomRating from '../../../components/CustomRating';
import { boldFontFamily } from '../../../constant/fonts';
import {
  buttonColor,
  defaultColor,
  descriptionColorVer2,
} from '../../../constant/colors';
import Text from '../../../components/MyText';
import { getDate } from '../../../function';

const Review = ({ review, handleNavigateReview }) => {
  const {
    content,
    createdAt,
    id,
    star,
    title,
    updatedAt,
    userId,
    userImage,
    userName,
    vehicle,
    walkwayId,
    walkwayTitle,
  } = review;
  return (
    <TouchableWithoutFeedback onPress={() => handleNavigateReview(id)}>
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <CustomImage source={{ uri: userImage }} style={styles.image} />
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
        <Text style={styles.date}>{getDate(createdAt)}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
    
    marginBottom: 13, 
  },
  textWrapper: {
  },
  date: {
    fontSize: 12,
    color: descriptionColorVer2,
  },
});
