import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { windowWidth } from '../../../constant/styles';
import Text from '../../../components/MyText';
import CustomImage from '../../../components/CustomImage';
import { AddFriends, Alarm } from '../../../constant/images/Friends';
import {
  boldFontFamily,
  defaultFontFamily,
  defaultFontSize,
  mediumFontFamily,
  montBoldFontFamily,
} from '../../../constant/fonts';
import {
  backgroundColor,
  defaultColor,
  mainColor,
} from '../../../constant/colors';
import { AddComma } from '../../../function';
import { useSelector } from 'react-redux';
import MyTag from '../components/MyTag';
import BadgeModal from '../../../components/BadgeModal';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';

const FriendsScreen = ({
  friendList = [],
  unreadExist,
  badges,
  handleNavigateAddFriends,
  handleNavigateFriendsAlarm,
  handleNavigate,
  handleDetailFeed,
}) => {
  const { userId: id } = useSelector(state => state.user);
  console.log({unreadExist})
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>이번주 랭킹</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.alarmWrapper}>
                {unreadExist && <View style={styles.dot} />}
                <TouchableWithoutFeedback onPress={handleNavigateFriendsAlarm}>
                  <CustomImage source={Alarm} style={styles.addFriendButton} />
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback onPress={handleNavigateAddFriends}>
                <CustomImage
                  source={AddFriends}
                  style={styles.addFriendButton}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </SafeAreaView>
      ),
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topContainer}>
        {friendList.length > 0 && (
          <View style={styles.top3Container}>
            {friendList.map(
              (item, index) =>
                index < 3 && (
                  <TouchableWithoutFeedback
                    onPress={() => handleNavigate(item.userId, index, item.id)}
                    key={`${item.id}-${index}`}
                  >
                    <View>
                      <View key={index} style={[styles.top3Wrapper]}>
                        <View style={styles.top3InnerWrapper}>
                          <Text style={styles.top3RankText}>{index + 1}.</Text>
                          <CustomImage
                            style={styles.top3Image}
                            source={{ uri: item.image }}
                          />
                          <Text style={styles.top3Text}>{item.name}</Text>
                          {/* MyTag 기준 있어야함. 내꺼일 때! */}
                          <MyTag userId={item.userId} id={id} />
                        </View>
                        <Text>
                          <Text style={styles.top3Text}>
                            {typeof item.distance === 'number' &&
                              AddComma(item.distance)}
                          </Text>
                          <Text
                            style={[
                              styles.top3Text,
                              { fontFamily: defaultFontFamily },
                            ]}
                          >
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
        )}
      </View>
      {friendList.length > 3 && (
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTitleContainer}>
            <Text style={styles.bottomTitle}>순위</Text>
            <Text style={[styles.bottomTitle, { marginRight: 65 }]}>
              닉네임
            </Text>
            <Text style={styles.bottomTitle}>달성거리</Text>
          </View>
          <View style={styles.bodyContainer}>
            {friendList.map(
              (item, index) =>
                index >= 3 && (
                  <TouchableWithoutFeedback
                    key={`${item}-${index}`}
                    onPress={() => handleNavigate(item.userId, index, item.id)}
                  >
                    <View key={index} style={[styles.bodyWrapper]}>
                      <View style={styles.bodyInnerWrapper}>
                        <Text style={styles.bodyRankText}>{index + 1}.</Text>
                        <CustomImage
                          style={styles.bodyImage}
                          source={{ uri: item.image }}
                        />
                        <Text style={styles.bodyText}>{item.name}</Text>
                        {/* MyTag 기준 있어야함. 내꺼일 때! */}
                        <MyTag userId={item.userId} />
                      </View>
                      <Text>
                        <Text style={styles.bodyText}>
                          {AddComma(item.distance)}
                        </Text>
                        <Text
                          style={[
                            styles.bodyText,
                            { fontFamily: defaultFontFamily },
                          ]}
                        >
                          (m)
                        </Text>
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ),
            )}
          </View>
        </View>
      )}
      {badges.length > 0 &&
        badges.map((item, index) => {
          const { badge } = item;
          const { image } = badge;
          return <BadgeModal data={item} key={image} />;
        })}
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
    paddingTop: 20,
    paddingBottom: 21,
    paddingHorizontal: 16,
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
    borderRadius: 50,
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
    borderRadius: 50,
  },
  bodyText: {
    fontFamily: boldFontFamily,
    fontSize: defaultFontSize,
    color: defaultColor,
  },

  alarmWrapper: {
    marginRight: 13,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: mainColor,
    borderRadius: 100,
    position: 'absolute',
    top: 3,
    right: 3,
  },
});
