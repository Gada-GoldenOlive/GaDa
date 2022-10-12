import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { DefaultProfile, thumbnail1 } from '../../../constant/images/Sample';
import { windowHeight, windowWidth } from '../../../constant/styles';
import FeedBookmark from '../../../components/FeedBookmark';
import StarIcon from '../../../constant/images/Star';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import {
  borderColor,
  borderColorVer2,
  buttonColor,
  defaultColor,
} from '../../../constant/colors';
import ReviewImageList from '../components/ReviewImageList';
import Pin from '../../../constant/images/Pin';
import Locate from '../../../constant/images/Locate';
import CustomButton from '../../../components/CustomButton';
import { getDistance, getHour } from '../../../function';
import Text from '../../../components/MyText';

const DetailFeedScreen = ({ feedInfo }) => {
  const {
    address,
    content,
    createdAt,
    distance,
    id,
    images = [],
    like,
    star,
    time,
    title,
    updatedAt,
    userImage,
    userName,
    vehicle,
    walkwayId,
    walkwayImage,
    walkwayTitle,
  } = feedInfo;
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          {walkwayImage !== '' ? (
            <CustomImage
              style={styles.background}
              source={{ uri: walkwayImage }}
            />
          ) : (
            <CustomImage style={styles.background} source={thumbnail1} />
          )}
          <View style={styles.topInformationContainer}>
            <View style={styles.topWrapper}>
              <View style={styles.userWrapper}>
                {userImage !== '' ? (
                  <CustomImage
                    style={styles.userImage}
                    source={{ uri: userImage }}
                  />
                ) : (
                  <CustomImage
                    style={styles.userImage}
                    source={DefaultProfile}
                  />
                )}
                <Text style={styles.userName}>{userName}</Text>
              </View>
              <FeedBookmark />
            </View>
            <View style={styles.bottomWrapper}>
              <View style={styles.bottomInfo}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{`소요시간 : ${getHour(
                  time,
                )} / 거리 : ${getDistance({
                  distance: distance,
                  unit: 'km',
                })}km`}</Text>
              </View>
              <View style={styles.score}>
                <CustomImage style={styles.star} source={StarIcon} />
                <Text style={styles.scoreNum}>{star}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <ReviewImageList images={images} />
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.locationWrapper}>
              <CustomImage style={styles.pin} source={Locate} />
              <Text style={styles.location}>{address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableWithoutFeedback>
        <View style={styles.buttonWrapper}>
          <Text style={styles.text}>산책시작</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default DetailFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  background: {
    position: 'absolute',
  },
  topInformationContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 18,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    marginEnd: 9,
    borderRadius: 100,
  },
  userName: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: 13,
  },
  bottomWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomInfo: {
    flex: 1,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: 'white',
  },
  description: {
    color: borderColor,
    lineHeight: 22,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 16,
    height: 16,
    marginEnd: 6,
  },
  scoreNum: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: 18,
  },
  bottomContainer: {
    width: windowWidth,
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 16,
    borderTopColor: borderColorVer2,
    borderTopWidth: 1,
    paddingTop: 19.5,
    paddingBottom: 31,
  },
  content: {
    fontSize: boldFontSize,
  },
  locationWrapper: {
    paddingTop: 31,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pin: {
    width: 24,
    height: 24,
    marginEnd: 6,
  },
  buttonWrapper: {
    backgroundColor: buttonColor,
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 33,
    marginTop: 13,
  },
  text: {
    fontFamily: boldFontFamily,
    fontSize: 18,
    letterSpacing: -0.36,
    color: 'white',
  },
});
