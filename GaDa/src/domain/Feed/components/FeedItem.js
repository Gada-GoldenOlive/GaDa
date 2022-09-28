import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomRating from '../../../components/CustomRating';
import CustomImage from '../../../components/CustomImage';
import { MapImage, Sample } from '../../../constant/images/Temp';
import FeedBookmark from '../../../components/FeedBookmark';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';

const FeedItem = ({ item, index, handleDetailFeed }) => {
    const {id, user, name} = item;
  return (
    <TouchableWithoutFeedback onPress={() => handleDetailFeed(id)}>
      <View style={styles.itemContainer}>
        <View style={styles.topContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userWrapper}>
              <CustomImage source={Sample} style={styles.image} />
              <View style={styles.informationWrapper}>
                <Text style={styles.name}>{item.user.name}</Text>
                <CustomRating
                  style={styles.rating}
                  readonly
                  size={11}
                  score={item.score}
                  starMargin={2.6}
                  tintColor="white"
                />
              </View>
            </View>
            <FeedBookmark />
          </View>
        </View>
        <CustomImage source={MapImage} style={styles.headerImage} />
        <View style={styles.radient} />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.bottomWrapper}>
            <Text style={styles.description}>{`소요시간: ${
              item.time / 60
            }시간 / 거리: ${item.distance}km`}</Text>
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
