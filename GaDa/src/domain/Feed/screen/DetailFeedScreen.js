import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { DefaultProfile } from '../../../constant/images/Sample';
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

const DetailFeedScreen = ({ id }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <CustomImage style={styles.background} source={MapImage} />
          <View style={styles.topInformationContainer}>
            <View style={styles.topWrapper}>
              <View style={styles.userWrapper}>
                <CustomImage style={styles.userImage} source={DefaultProfile} />
                <Text style={styles.userName}>userName</Text>
              </View>
              <FeedBookmark />
            </View>
            <View style={styles.bottomWrapper}>
              <View style={styles.bottomInfo}>
                <Text style={styles.title}>
                  길이름이 엄청 길다면? 어떻게 될까? 아직 부족하다 더 길게
                  해보자 오호 두줄로 넘어간다
                </Text>
                <Text style={styles.description}>
                  소요시간 : 2시간 / 거리 : 1.25km
                </Text>
              </View>
              <View style={styles.score}>
                <CustomImage style={styles.star} source={StarIcon} />
                <Text style={styles.scoreNum}>4.0</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <ReviewImageList />
          <View style={styles.contentContainer}>
            <Text style={styles.content}>
              내용입니다dajfklaj;dklfjakd
              adkfjslkdjfsdkfls;djlfkajdl;kfja;kldfja;lkdsjfakl;djs;flakdjfkaljsdkfljskldjfskldjfksldjfklsjdfklsjdkflsjdklfajdlkfjad
              adlkfjsaldfjslkd sdkfjskldㄴㅇ러ㅏsdfjkasld sdkfjs sdklfjskld
              sdlkfjskdl sdlkfjskldf sdlkfjslkd 미;어라ㅣ멍라ㅣ머이ㅏ러마얼;마ㅣ
              skdjfla;mdlfkaj;dsㅁ아러ㅣㄴㅇ ㄹㅁ아ㅣ러니ㅏ어림ㅇ
              ㄹ미ㅏ어림;ㄴㅇㄹ머;이
              ㅁ이ㅏ러마ㅣㅇ러ㅏatListContaineradlkfjaldkfj
            </Text>
            <View style={styles.locationWrapper}>
              <CustomImage style={styles.pin} source={Locate} />
              <Text style={styles.location}>서대문구 서대문로</Text>
            </View>
          </View>
        </View>
      </ScrollView>
        <TouchableWithoutFeedback>
          <View style={styles.buttonWrapper}>
            <Text style={styles.text}>경로시작</Text>
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
