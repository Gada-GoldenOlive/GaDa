import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { windowWidth } from '../../../constant/styles';
import CustomImage from '../../../components/CustomImage';
import {
  comment,
  defaultImage,
  distance,
  friend,
  pin,
  review,
  time,
  walkway,
} from '../../../constant/images/Badge';
import Text from '../../../components/MyText';
const BadgeList = ({ badgeList }) => {
  /**
   * 피그마에 올라와 있는 순서대로 적어둠 (괄호 안은 code)
   * WALKWAY = 산책로 n개 달성! (THREE~HUNDRED) / 산책로 등록! (FIRST)
   * REVIEW = 리뷰 n개 달성! (THREE~HUNDRED)
   * WALKTIME = 산책 n시간 달성! (THREE~FIFTY) / 목표 시간 설정! (FIRST)
   * DISTANCE = 거리 n시간 달성! (THREE~FIFTY)
   * PIN = 핀작성 n개 달성! (THREE~HUNDRED)
   * FRIEND = 친구 n명 달성! (THREE~FIFTY) / 처음 친구 초대! (FIRST) / 친구를 이겼어요! (WIN) / 1위 달성! (BEST)
   * COMMENT = 댓글 n개 달성! (THREE~HUNDRED)
   * USER = 회원가입 완료! (FIRST)
   */

  const statusType = { ACHIEVE: 1, NON_ACHIEVE: 0 };
  const sortList = (a, b) => {
    return statusType[b.status] - statusType[a.status];
  };
  let sortedList = [...badgeList];
  sortedList.sort(sortList);

  const renderItem = ({ item, index }) => {
    const { badge, status } = item;
    const { image, title } = badge;
  
    return status === 'NON_ACHIEVE' ? (
      <View style={styles.itemContaier}>
        <CustomImage style={styles.image} source={defaultImage} />
        <Text style={styles.text}>{title}</Text>
      </View>
    ) : (
      <View style={styles.itemContaier}>
        <CustomImage style={styles.image} source={{ uri: image }} />
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={sortedList}
        numColumns={3}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, justifyContent: 'space-between', paddingTop: 47}}
      />
    </View>
  );
};

export default BadgeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContaier: {
    marginBottom: 49,
    alignItems: 'center',
    width: (windowWidth - 32) / 3,

  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },
  text: {
    letterSpacing: -0.28,
    flex: 1,
  },
});
