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
    },
    {
      category: 'REVIEW',
      code: 3,
      isValid: true,
    },
    {
      category: 'WALKTIME',
      code: 3,
      isValid: true,
    },
    {
      category: 'DISTANCE',
      code: 3,
      isValid: true,
    },
    {
      category: 'PIN',
      code: 3,
      isValid: true,
    },
    {
      category: 'FRIEND',
      code: 3,
      isValid: true,
    },
    {
      category: 'COMMENT',
      code: 3,
      isValid: true,
    },
  ];
  const getTitle = item => {
    const { category, code } = item;
    switch (category) {
      case 'WALKWAY':
        return `산책로 ${code}개 달성!`;
      case 'REVIEW':
        return `리뷰 ${code}개 달성!`;
      case 'WALKTIME':
        return `산책 ${code}시간 달성!`;
      case 'DISTANCE':
        return `거리 ${code}km 달성!`;
      case 'PIN':
        return `핀 ${code}개 달성!`;
      case 'FRIEND':
        return `친구 ${code}명 달성!`;
      case 'COMMENT':
        return `댓글 ${code}개 달성!`;
    }
  };
  const getImage = item => {
    const { category, isValid } = item;
    if(!isValid){
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
    const { category, code, isValid } = item;

    return (
      <View
        style={[
          styles.itemContaier,
          index % 3 !== 2 && { marginEnd: (windowWidth - 32 - 285) / 2 },
        ]}
      >
        <CustomImage style={styles.image} source={getImage(item)} />
        <Text style={styles.text}>{getTitle(item)}</Text>
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
