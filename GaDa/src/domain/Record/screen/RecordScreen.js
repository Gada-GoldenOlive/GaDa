import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomImage from '../../../components/CustomImage';
import Profile from '../components/Profile';
import Writing from '../../../constant/images/Writing';
import {
  boldFontFamily,
  boldFontSize,
  mediumFontFamily,
} from '../../../constant/fonts';
import {
  blackColor,
  buttonColor,
  descriptionColorVer2,
  mainColor,
} from '../../../constant/colors';
import Goal from '../components/Goal';
import Badge from '../components/Badge';
import { Arrow, ArrowBlack } from '../../../constant/images/Arrow';
import RecentWalk from '../components/RecentWalk';
import MyWalkwayList from '../components/MyWalkwayList';
import Text from '../../../components/MyText';
import CenterModal from '../../../components/CenterModal';
import BadgeModal from '../../../components/BadgeModal';

const RecordScreen = ({
  userData,
  myWalks,
  badgeList,
  recentWalks,
  badges,
  handleNavigate,
  handleNaivigateGoal,
  handleNavigateSetting,
  handleNavigateBadge,
  handleNavigateRecent,
  handleNavigateMyRecord,
  handleNavigateLikeReviews,
  handleDetailFeed,
  handleLoadMore,
  badge,
  handleNavigateHome,
  handleNavigateFeedMore
}) => {
  const {
    id,
    loginId,
    image,
    name,
    pinCount,
    badgeCount,
    goalDistance,
    goalTime,
    totalDistance,
    totalTime,
  } = userData;
  const profile = { loginId, image, name };
  const goal = { loginId, goalDistance, goalTime, totalDistance, totalTime };
  const header = () => {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Profile
            handleNavigateLikeReviews={handleNavigateLikeReviews}
            handleNavigateSetting={handleNavigateSetting}
            profile={profile}
          />
        </View>
        <View style={styles.goalContainer}>
          <View style={styles.goalTitleContainer}>
            <View style={styles.goalTitleWrapper}>
              <Text style={styles.goalTitle}>이번 주 목표</Text>
              <TouchableWithoutFeedback onPress={handleNaivigateGoal}>
                <CustomImage source={Writing} style={styles.goalWriting} />
              </TouchableWithoutFeedback>
            </View>
            {/*<TouchableWithoutFeedback onPress={handleNavigateMyRecord}>
              <View style={styles.moreWrapper}>
                <Text>전체보기</Text>
                <CustomImage
                  style={styles.arrow}
                  source={Arrow}
                  tintColor={descriptionColorVer2}
                />
              </View>
            </TouchableWithoutFeedback>*/}
          </View>
          <Goal goal={goal} />
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
          <Badge badgeList={badgeList} />
        </View>
        {recentWalks.length >= 1 && (
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
            <RecentWalk recentWalks={recentWalks} />
          </View>
        )}
        <View style={styles.myWalkContainer}>
          <View style={styles.recentTitleContainer}>
            <Text style={styles.recentTitle}>작성한 피드</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <MyWalkwayList
        ListHeaderComponent={header}
        myWalks={myWalks}
        handleDetailFeed={handleDetailFeed}
        handleLoadMore={handleLoadMore}
        handleNavigateHome={handleNavigateHome}
      />
      {badges.length > 0 &&
        badges.map((item, index) => {
          const { badge } = item;
          const { image } = badge;
          return <BadgeModal data={item} key={image} />;
        })}
    </View>
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
    justifyContent: 'space-between',
  },
  goalTitleWrapper: {
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
  moreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    fontFamily: mediumFontFamily,
    color: descriptionColorVer2,
  },
  arrow: {
    width: 11.5,
    height: 11.5,
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
  },
});
