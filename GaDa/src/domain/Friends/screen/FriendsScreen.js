import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { windowWidth } from '../../../constant/styles';
import Text from '../../../components/MyText';
import CustomImage from '../../../components/CustomImage';
import {
  RankingS,
  SampleImage1,
  SampleImage2,
  SampleImage3,
} from '../../../constant/images/Sample';
import { AddFriends, Alarm } from '../../../constant/images/Friends';
import {
  boldFontFamily,
  defaultFontFamily,
  defaultFontSize,
  mediumFontFamily,
  montBoldFontFamily,
} from '../../../constant/fonts';
import { backgroundColor, defaultColor } from '../../../constant/colors';

const friendsLangkingList = [
  {
    name: '만두전골',
    image: SampleImage2,
    totalDistance: 12293,
  },
  {
    name: '상암동 정호연',
    image: SampleImage3,
    totalDistance: 10090,
  },
  {
    name: '산책왕 차돌',
    image: SampleImage3,
    totalDistance: 9252,
  },

  {
    name: '산책왕 뽀삐',
    image: SampleImage1,
    totalDistance: 5350,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    totalDistance: 4940,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    totalDistance: 3593,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    totalDistance: 12,
  },
];
const FriendsScreen = ({
  handleNavigateAddFriends,
  handleNavigateFriendsAlarm,
}) => {
  const isMe = 3; //임시로
  const MyBadge = () => {
    return (
      <View style={styles.myBadgeWrapper}>
        <Text style={styles.myBadgeText}>MY</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}  bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>이번주 랭킹</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={handleNavigateFriendsAlarm}>
              <CustomImage
                source={Alarm}
                style={[styles.addFriendButton, { marginRight: 13 }]}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleNavigateAddFriends}>
              <CustomImage source={AddFriends} style={styles.addFriendButton} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.top3Container}>
          {friendsLangkingList.map(
            (item, index) =>
              index < 3 && (
                <TouchableWithoutFeedback onPress={() => console.log(index)}>
                  <View>
                    <View key={index} style={[styles.top3Wrapper]}>
                      <View style={styles.top3InnerWrapper}>
                        <Text style={styles.top3RankText}>{index + 1}.</Text>
                        <CustomImage
                          style={styles.top3Image}
                          source={item.image}
                        />
                        <Text style={styles.top3Text}>{item.name}</Text>
                        {/* MyBadge 기준 있어야함. 내꺼일 때! */}
                        <MyBadge />
                      </View>
                      <Text>
                        <Text style={styles.top3Text}>
                          {item.totalDistance
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                        <Text
                          style={[
                            styles.top3Text,
                            { fontFamily: defaultFontFamily },
                          ]}
                        >
                          {' '}
                          (m)
                        </Text>
                      </Text>
                    </View>
                    {index !== 2 && (
                      <View
                        style={{
                          // width: '100%',
                          height: 0.7,
                          backgroundColor: '#9AF6CA',
                          marginHorizontal: 16,
                        }}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              ),
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomTitleContainer}>
          <Text style={styles.bottomTitle}>순위</Text>
          <Text style={[styles.bottomTitle, { marginRight: 65 }]}>닉네임</Text>
          <Text style={styles.bottomTitle}>달성거리</Text>
        </View>
        <View style={styles.bodyContainer}>
          {friendsLangkingList.map(
            (item, index) =>
              index >= 3 && (
                <TouchableWithoutFeedback onPress={() => console.log(index)}>
                  <View key={index} style={[styles.bodyWrapper]}>
                    <View style={styles.bodyInnerWrapper}>
                      <Text style={styles.bodyRankText}>{index + 1}.</Text>
                      <CustomImage
                        style={styles.bodyImage}
                        source={item.image}
                      />
                      <Text style={styles.bodyText}>{item.name}</Text>
                      {/* MyBadge 기준 있어야함. 내꺼일 때! */}
                      <MyBadge />
                    </View>
                    <Text>
                      <Text style={styles.bodyText}>
                        {item.totalDistance
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                      <Text
                        style={[
                          styles.bodyText,
                          { fontFamily: defaultFontFamily },
                        ]}
                      >
                        {' '}
                        (m)
                      </Text>
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ),
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    color: 'black',
  },
  addFriendButton: {
    width: 32,
    height: 32,
  },
  top3Container: {
    backgroundColor: '#49d492',
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 20,
  },
  top3Wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  top3InnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  top3RankText: {
    // fontFamily: montBoldFontFamily,
    fontFamily: boldFontFamily,
    fontSize: 26,
    color: 'white',
    marginRight: 13,
  },
  top3Image: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  top3Text: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    color: 'white',
  },

  bottomContainer: {
    margin: 16,
  },
  bottomTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: 10,
    paddingEnd: 48,
  },
  bottomTitle: {
    fontFamily: mediumFontFamily,
    fontSize: 12,
    color: '#9e9e9e',
  },
  bodyContainer: {
    marginTop: 7,
  },
  bodyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,

    backgroundColor: 'white',
    borderRadius: 10,

    marginBottom: 10,
  },
  bodyInnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyRankText: {
    // fontFamily: montBoldFontFamily,
    fontFamily: boldFontFamily,
    fontSize: 23,
    color: defaultColor,
    marginRight: 15,
  },
  bodyImage: {
    width: 34,
    height: 34,
    marginRight: 14,
  },
  bodyText: {
    fontFamily: boldFontFamily,
    fontSize: defaultFontSize,
    color: defaultColor,
  },
  myBadgeWrapper: {
    paddingHorizontal: 5.5,
    paddingVertical: 1,

    borderRadius: 15,
    backgroundColor: 'black',

    marginLeft: 5,
  },
  myBadgeText: {
    fontFamily: mediumFontFamily,
    fontSize: 10,
    color: 'white',
  },
});
