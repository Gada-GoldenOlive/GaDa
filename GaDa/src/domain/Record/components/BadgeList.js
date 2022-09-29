import { FlatList, StyleSheet, Text, View } from 'react-native';
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
const BadgeList = () => {
  const dataList = [
    {
      category: 'WALKWAY',
      code: 3,
      isValid: true,
      title: '산책로 3개 달성!'
    },
    {
      category: 'REVIEW',
      code: 3,
      isValid: true,
      title: '리뷰 3개 달성!'
    },
    {
      category: 'WALKTIME',
      code: 3,
      isValid: true,
      title: '산책 3시간 달성!'
    },
    {
      category: 'DISTANCE',
      code: 3,
      isValid: true,
      title: '거리 3km 달성!'
    },
    {
      category: 'PIN',
      code: 3,
      isValid: true,
      title: '핀작성 3개 달성!'
    },
    {
      category: 'FRIEND',
      code: 3,
      isValid: true,
      title: '친구 3명 달성!'
    },
    {
      category: 'COMMENT',
      code: 3,
      isValid: true,
      title: '핀댓글 3개 달성!'
    },
    {
      category: 'WALKWAY',
      code: 5,
      isValid: false,
      title: '산책로 5개 달성!'
    },
    {
      category: 'REVIEW',
      code: 5,
      isValid: false,
      title: '리뷰 5개 달성!'
    },
    {
      category: 'WALKTIME',
      code: 5,
      isValid: false,
      title: '산책 5시간 달성!'
    },
    {
      category: 'DISTANCE',
      code: 5,
      isValid: false,
      title: '거리 5km 달성!'
    },
    {
      category: 'PIN',
      code: 5,
      isValid: false,
      title: '핀작성 5개 달성!'
    },
    {
      category: 'FRIEND',
      code: 5,
      isValid: false,
      title: '친구 5명 달성!'
    },
    {
      category: 'COMMENT',
      code: 5,
      isValid: false,
      title: '핀댓글 5개 달성!'
    },
  ];
  

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
  const getNum = code => {
    switch (code) {
      case 'THREE':
        return 3;
      case 'FIVE':
        return 5;
      case 'TEN':
        return 10;
      case 'TWENTY':
        return 20;
      case 'HUNDRED':
        return 100;
      case 'FIFTY':
        return 50;
      
    }
  };
  const getImage = item => {
    const { category, isValid } = item;
    if (!isValid) {
      return defaultImage;
    }
    switch (category) {
      case 'WALKWAY':
        return walkway;
      case 'REVIEW':
        return review;
      case 'WALKTIME':
        return time;
      case 'DISTANCE':
        return distance;
      case 'PIN':
        return pin;
      case 'FRIEND':
        return friend;
      case 'COMMENT':
        return comment;
    }
  };
  const renderItem = ({ item, index }) => {
    const {title, category, code, isValid } = item;

    return (
      <View
        style={[
          styles.itemContaier,
          index % 3 !== 2 && { marginEnd: (windowWidth - 32 - 285) / 2 },
        ]}
      >
        <CustomImage style={styles.image} source={getImage(item)} />
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dataList}
        numColumns={3}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
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
    width: 95,
    marginBottom: 49,
    alignItems: 'center',
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
