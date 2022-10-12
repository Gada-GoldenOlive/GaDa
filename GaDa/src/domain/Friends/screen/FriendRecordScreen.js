import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import {
  blackColor,
  borderColor,
  defaultColor,
  descriptionColor,
  descriptionColorVer2,
} from '../../../constant/colors';
import {
  boldFontFamily,
  boldFontSize,
  defaultFontFamily,
  mediumFontFamily,
  montBoldFontFamily,
} from '../../../constant/fonts';
import Text from '../../../components/MyText';
import { Trash } from '../../../constant/images/Trash';
import Goal from '../../Record/components/Goal';
import { Arrow } from '../../../constant/images/Arrow';
import MyWalkwayList from '../../Record/components/MyWalkwayList';
import { AddComma } from '../../../function';
import PopupModal from '../../../components/PopupModal';
import { useState } from 'react';
import { PinSample1, PinSample2 } from '../../../constant/images/PinSample';
import { useSelector } from 'react-redux';
import MyTag from '../components/MyTag';

const FriendRecordScreen = ({
  dataList,
  rank,
  handleDeleteButton,
  handleViewMoreButton,
  isPopupVisible,
  openPopup,
  closePopup,
  handleConfirmButton,
  userData,
  userId,
  myWalks,
  goalInfo,
}) => {
  // const { id, name, image, totalTime, totalDistance } = dataList;
  const {
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
  const goal = { loginId, goalDistance, goalTime, totalDistance, totalTime };
  const { userId: myId } = useSelector(state => state.user);

  const RenderUserInfo = () => {
    return (
      <>
        <PopupModal
          isPopupVisible={isPopupVisible}
          closePopup={closePopup}
          handleConfirmButton={handleConfirmButton}
          content={{
            title: `${name}님을\n친구에서 삭제하시겠어요?`,
            description: `${name}님과 관련된\n모든 정보가 삭제됩니다`,
            button: '삭제하기',
          }}
        />
        <View style={styles.userInfoContainer}>
          <View style={styles.flexDirection}>
            <View style={styles.flexDirection}>
              <CustomImage source={{ uri: image }} style={styles.userImg} />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.userName}>{name}</Text>
                  <MyTag userId={userId} id={myId} />
                </View>
                <Text style={styles.userId}>{loginId}</Text>
              </View>
            </View>
            {userId !== myId && (
              <View>
                <TouchableWithoutFeedback onPress={handleDeleteButton}>
                  <CustomImage source={Trash} style={styles.trashIcon} />
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </View>
      </>
    );
  };

  const RenderRank = () => {
    return (
      <View style={styles.rankContainer}>
        <Text style={styles.rankTitle}>이번주 순위</Text>
        <View style={styles.rankDivider} />
        <View style={styles.rankWrapper}>
          <View style={styles.flexDirection}>
            <Text style={styles.rankText}>{rank}.</Text>
            <CustomImage
              source={{ uri: image }}
              style={[styles.userImg, { marginRight: 10 }]}
            />
            <Text style={styles.rankUserName}>{name}</Text>
          </View>
          <Text>
            <Text style={styles.rankDistance}>
              {typeof totalDistance === 'number' && AddComma(totalDistance)}
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

  const RenderGoalInfo = () => {
    return (
      <View style={styles.goalContainer}>
        <TouchableWithoutFeedback onPress={handleViewMoreButton}>
          <View style={styles.viewMore}>
            <Text style={styles.viewMoreText}>전체보기</Text>
            <CustomImage
              source={Arrow}
              style={styles.arrowIcon}
              tintColor={descriptionColorVer2}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={{ marginTop: -7 }}>
          <Goal goal={goal} />
        </View>
      </View>
    );
  };

  const RenderWalkwaysInfo = () => {
    return (
      <View style={styles.walkwaysContainer}>
        <View style={styles.recentTitleContainer}>
          <Text style={styles.recentTitle}>작성한 산책로</Text>
        </View>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.container}>
        <RenderUserInfo />
        <RenderRank />
        <RenderGoalInfo />
        <RenderWalkwaysInfo />
      </View>
    );
  };

  return (
    <MyWalkwayList
      ListHeaderComponent={ListHeaderComponent}
      myWalks={myWalks}
    />
  );
};

export default FriendRecordScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    borderRadius: 50,
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
  trashIcon: {
    width: 28,
    height: 28,
  },
  goalContainer: {
    marginTop: 23,
  },
  viewMore: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewMoreText: {
    fontFamily: mediumFontFamily,
    letterSpacing: -0.28,
    color: descriptionColorVer2,
  },
  arrowIcon: {
    width: 11.5,
    height: 11.5,
  },
  walkwaysContainer: {
    marginHorizontal: -16,
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
});
