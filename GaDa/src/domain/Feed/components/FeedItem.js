import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomRating from '../../../components/CustomRating';
import CustomImage from '../../../components/CustomImage';
import { MapImage, Sample } from '../../../constant/images/Temp';
import FeedBookmark from '../../../components/FeedBookmark';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { getDistance, getHour } from '../../../function';

const FeedItem = ({ item, index, handleDetailFeed }) => {
  /*
  {"address": "서울특별시 용산구 서빙고로", "distance": 9550, "images": [], "like": false, 
"review": {"content": "테스트리뷰3 입니다~~~", "createdAt": "2022-10-08T07:30:42.170Z", "id": "39r918af-0705-d123-f0b9-r0bc742a204dc3", 
  "star": 4, "title": "테스트  리뷰3", "updatedAt": "2022-10-08T07:30:42.170Z", "userId": "42e83ce7-5ba5-4461-91be-119c4f278ff9", 
  "userImage": "https://picsum.photos/150/150/?image=1", "userName": "테스트유저", "vehicle": "MANUAL", "walkwayId": "d2209c34-056f-458f-9bab-ce99e34d2e44", 
  "walkwayTitle": "박물관 보행로 산책로"}, 
"time": 440, "walkwayImage": "https://picsum.photos/400/250/?image=481"}
*/

  const { address, distance, images, like, review, time, walkwayImage } = item;
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
    <TouchableWithoutFeedback onPress={() => handleDetailFeed(id)}>
      <View style={styles.itemContainer}>
        <View style={styles.topContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userWrapper}>
              <CustomImage source={{uri: userImage}} style={styles.image} />
              <View style={styles.informationWrapper}>
                <Text style={styles.name}>{userName}</Text>
                <CustomRating
                  style={styles.rating}
                  readonly
                  size={11}
                  score={item.score}
                  starMargin={star}
                  tintColor="white"
                />
              </View>
            </View>
            <FeedBookmark />
          </View>
        </View>
        <CustomImage source={{uri: walkwayImage}} style={styles.headerImage} />
        <View style={styles.radient} />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.bottomWrapper}>
            <Text style={styles.description}>{`소요시간: ${getHour(time)} / 거리: ${getDistance({distance, unit: 'km'})}km`}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'pink',

    height: 270,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    zIndex: 999,
  },
  userContainer: {
    marginBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userWrapper: {
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
    color: 'white',
  },
  rating: {
    justifyContent: 'flex-start',
  },
  bottomContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    zIndex: 999,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: 'white',
  },
  description: {
    lineHeight: 22,
    color: '#e7e7e7',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  radient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
