import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { borderColor } from '../../../constant/colors';
import {
  boldFontFamily,
  defaultFontFamily,
  mediumFontFamily,
  montBoldFontFamily,
} from '../../../constant/fonts';
import Text from '../../../components/MyText';

const FriendRecordScreen = ({ dataList, rank }) => {
  const { id, name, image, totalTime, totalDistance } = dataList;

  const renderUserInfo = () => {
    return (
      <View style={styles.userInfoContainer}>
        <View style={styles.flexDirection}>
          <View style={styles.flexDirection}>
            <CustomImage source={image} style={styles.userImg} />
            <View>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userId}>{id}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderRank = () => {
    return (
      <View style={styles.rankContainer}>
        <Text style={styles.rankTitle}>이번주 순위</Text>
        <View style={styles.rankDivider} />
        <View style={styles.rankWrapper}>
          <View style={styles.flexDirection}>
            <Text style={styles.rankText}>{rank}.</Text>
            <CustomImage
              source={image}
              style={[styles.userImg, { marginRight: 10 }]}
            />
            <Text style={styles.rankUserName}>{name}</Text>
          </View>
          <Text>
            <Text style={styles.rankDistance}>
              {typeof totalDistance === 'number' &&
                totalDistance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
            <Text
              style={[styles.rankDistance, { fontFamily: defaultFontFamily }]}
            >
              {' '}
              (m)
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderUserInfo()}
      {renderRank()}
    </View>
  );
};

export default FriendRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  userInfoContainer: {
    paddingVertical: 20.5,
  },
  userName: {
    fontSize: 18,
    fontFamily: boldFontFamily,
    letterSpacing: -0.36,
    color: 'black',
  },
  userId: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: -0.24,
    color: '#929292',
  },
  userImg: {
    width: 42,
    height: 42,
    marginRight: 13,
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankContainer: {
    backgroundColor: '#49D492',
    paddingTop: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  rankTitle: {
    marginLeft: 1,
    fontFamily: mediumFontFamily,
    fontSize: 12,
    letterSpacing: -0.24,
    color: 'white',
  },
  rankDivider: {
    height: 1,
    backgroundColor: '#9af6ca',
    marginTop: 5.5,
  },
  rankWrapper: {
    flexDirection: 'row',
    paddingVertical: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankText: {
    // fontFamily: montBoldFontFamily,
    fontFamily: boldFontFamily,
    fontSize: 26,
    lineHeight: 31,
    letterSpacing: -0.52,
    color: 'white',
    marginRight: 13,
  },
  rankUserName: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    letterSpacing: -0.32,
    color: 'white',
  },
  rankDistance: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    letterSpacing: -0.32,
    color: 'white',
  },
});
