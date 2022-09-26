import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CenterModal from '../../../components/CenterModal';
import WalkEnd from '../../../components/WalkEnd';
import CustomImage from '../../../components/CustomImage';
import { MapImage, Sample } from '../../../constant/images/Temp';
import { windowHeight, windowWidth } from '../../../constant/styles';
import CustomButton from '../../../components/CustomButton';
import { MyS } from '../../../constant/images/Sample';
import Profile from '../components/Profile';
import Writing from '../../../constant/images/Writing';
import {
  boldFontFamily,
  boldFontSize,
  mediumFontFamily,
} from '../../../constant/fonts';
import { blackColor, buttonColor, mainColor } from '../../../constant/colors';
import Goal from '../components/Goal';
import Badge from '../components/Badge';
import { Arrow, ArrowBlack } from '../../../constant/images/Arrow';
import RecentWalk from '../components/RecentWalk';
import MyWalkwayList from '../components/MyWalkwayList';

const RecordScreen = ({
  handleNavigate,
  handleNaivigateGoal,
  handleNavigateSetting,
  handleNavigateBadge,
  handleNavigateRecent,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile handleNavigateSetting={handleNavigateSetting} />
      </View>
      <View style={styles.goalContainer}>
        <View style={styles.goalTitleContainer}>
          <Text style={styles.goalTitle}>달성목표</Text>
          <TouchableWithoutFeedback onPress={handleNaivigateGoal}>
            <CustomImage source={Writing} style={styles.goalWriting} />
          </TouchableWithoutFeedback>
        </View>
        <Goal />
      </View>
      <View style={styles.badgeContainer}>
        <View style={styles.badgeTitleContainer}>
          <Text style={styles.badgeTitle}>나의 뱃지</Text>
          <TouchableWithoutFeedback onPress={handleNavigateBadge}>
            <View style={styles.moreWrapper}>
              <Text style={styles.more}>더보기</Text>
              <CustomImage style={styles.moreImage} source={Arrow} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Badge />
      </View>
      <View style={styles.recentContainer}>
        <View style={styles.recentTitleContainer}>
          <Text style={styles.recentTitle}>최근 활동</Text>
          <TouchableWithoutFeedback onPress={handleNavigateRecent}>
            <View style={styles.recentMoreWrapper}>
              <Text style={styles.recentMore}>더보기</Text>
              <CustomImage style={styles.moreImage} source={ArrowBlack} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <RecentWalk />
      </View>
      <View style={styles.myWalkContainer}>
        <View style={styles.recentTitleContainer}>
          <Text style={styles.recentTitle}>작성한 산책로</Text>
        </View>
        <MyWalkwayList />
      </View>
    </ScrollView>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  goalContainer: {
    marginTop: 35,
    paddingHorizontal: 16,
  },
  goalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalTitle: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: blackColor,
    marginRight: 8,
  },
  goalWriting: {
    width: 24,
    height: 24,
  },
  badgeContainer: {
    backgroundColor: mainColor,
    paddingTop: 21,
    paddingBottom: 23,
    paddingHorizontal: 16,
    marginTop: 44,
  },
  badgeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeTitle: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  moreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    color: 'white',
    fontFamily: mediumFontFamily,
  },
  moreImage: {
    width: 11.5,
    height: 11.5,
  },
  recentContainer: {
    marginTop: 30,
  },
  recentTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,

    paddingHorizontal: 16,
  },
  recentTitle: {
    color: blackColor,
    fontSize: boldFontSize,
    fontFamily: boldFontFamily,
  },
  recentMoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentMore: {
    fontFamily: mediumFontFamily,
    color: 'rgb(73,73,73)',
  },
  myWalkContainer: {
    marginTop: 30,
    marginBottom: 60,
  },
});
