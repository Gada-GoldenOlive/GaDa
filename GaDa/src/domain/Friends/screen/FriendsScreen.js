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
import { AddFriend } from '../../../constant/images/AddFriend';
import {
  boldFontFamily,
  defaultFontFamily,
  montBoldFontFamily,
} from '../../../constant/fonts';

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
const FriendsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>나의 친구</Text>
        <CustomImage source={AddFriend} style={styles.addFriendButton} />
      </View>

      <View style={styles.bodyTop3Container}>
        {friendsLangkingList.map(
          (item, index) =>
            index < 3 && (
              <TouchableWithoutFeedback onPress={() => console.log(index)}>
                <View
                  key={index}
                  style={[
                    styles.top3Wrapper,
                    index !== 2 && {
                      borderBottomWidth: 0.7,
                      borderColor: '#9AF6CA',
                    },
                  ]}
                >
                  <View style={styles.top3InnerWrapper}>
                    <Text style={styles.top3RankText}>{index + 1}.</Text>
                    <CustomImage style={styles.top3Image} source={item.image} />
                    <Text style={styles.top3Text}>{item.name}</Text>
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
              </TouchableWithoutFeedback>
            ),
        )}
      </View>
      {/* <CustomImage source={RankingS} style={styles.image} /> */}
    </ScrollView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f8f8',
    backgroundColor: 'white',
    marginHorizontal: 16,
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
    width: 37,
    height: 37,
  },
  bodyTop3Container: {
    backgroundColor: '#49d492',
    borderRadius: 10,
    marginTop: 24,
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
});
