import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Text from './MyText';
import { boldFontFamily } from '../constant/fonts';
import { blackColor } from '../constant/colors';
import CustomImage from './CustomImage';
import Writing from '../constant/images/Writing';
import { useState } from 'react';
import { useEffect } from 'react';
import { AddFriends, Alarm } from '../constant/images/Friends';

const HeaderComponent = ({ title = '' }) => {
  const [src, setSrc] = useState();
  const [secondSrc, setSecondSrc] = useState();
  useEffect(() => {
    if (title === '피드') {
      setSrc(Writing);
    } else if (title === '이번주 랭킹') {
      setSrc(Alarm);
      setSecondSrc(AddFriends);
    }
  }, []);

  const handleGettingWalkway = () => {
    navigation.navigate('GettingWalkway');
  };

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.topContainer}>
        {title === '피드' && (
          <>
            {/* <FilteringButton />*/}
            <Text style={styles.title}>{title}</Text>
            <TouchableWithoutFeedback onPress={handleGettingWalkway}>
              <View style={styles.writeWrapper}>
                <CustomImage
                  style={styles.writing}
                  source={src}
                  tintColor="white"
                />
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
        {title === '이번주 랭킹' && (
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 21,
    paddingTop: 20,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    lineHeight: 31,
    color: blackColor,
    marginEnd: 8,
  },
  writeWrapper: {
    width: 37,
    height: 37,
    padding: 7,
    borderRadius: 100,
    backgroundColor: blackColor,
  },
  friendsButtonWrapper: {
    width: 32,
    height: 32,
  },
});
