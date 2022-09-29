import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { MyImageS } from '../../../constant/images/Sample';
import CustomImage from '../../../components/CustomImage';
import { PinSample1, PinSample2 } from '../../../constant/images/PinSample';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import CustomRating from '../../../components/CustomRating';
import { backgroundColor, blackColor, borderColor } from '../../../constant/colors';
import { getDistance } from '../../../function';

const MyWalkwayList = () => {
  const myinfo = { image: MyImageS, name: '산책와 뽀삐' };
  const tempList = [
    {
      name: '마포구 마포나루길 산책길',
      time: 60,
      distance: 1250,
      rating: 4.5,
      image: PinSample1,
    },
    {
      name: '성동구 서울숲로 산책길',
      time: 30,
      distance: 500,
      rating: 5,
      image: PinSample2,
    },
  ];

  const tempList2 = [];
  const renderItem = ({ item, index }) => {
    const { name, time, distance, rating, image } = item;
    return (
      <View style={styles.itemContainer}>
        <CustomImage style={styles.backgroundImage} source={image} />
        <View style={styles.gradient} />
        <View style={styles.titleContainer}>
          <CustomImage source={myinfo.image} style={styles.myImage} />
          <View style={styles.titleWrapper}>
            <Text style={styles.name}>{myinfo.name}</Text>
            <CustomRating
              score={rating}
              size={11}
              readOnly
              starMargin={2.6}
              tintColor="white"
            />
          </View>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.information}>
            <Text>소요시간: {time / 60}시간 / </Text>
            <Text>거리: {getDistance({distance, unit: 'm'})}m </Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {tempList.length >= 1 ? (
        <FlatList
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          data={tempList}
          bounces={false}
          disableVirtualization={false}
          renderItem={({ item, index }) => renderItem({ item, index })}
          onEndReachedThreshold={0.7}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      ) : (
        <View style={styles.nullContainer}>
          <CustomImage style={styles.nullImage} source={PinSample1} />
          <View style={styles.nullGradient} />
          <Text style={styles.nullTitle}>산책로를 만들고 공유하세요!</Text>
          <TouchableWithoutFeedback>
            <View style={styles.nullButton}>
              <Text style={styles.null}>기록시작</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default MyWalkwayList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: '100%',
    height: 184,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.21)',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 16,
    borderRadius: 10,
    paddingTop: 20.5,
  },
  myImage: {
    width: 30,
    height: 30,
    marginEnd: 9,
  },
  titleWrapper: {},
  name: {
    fontFamily: boldFontFamily,
    fontSize: 13,
    color: 'white',
  },
  informationContainer: {
    paddingBottom: 18,
    paddingStart: 16,
  },
  title: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  information: {
    color: borderColor,
    lineHeight: 22,
  },
  nullContainer: {
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
  },
  nullTitle: {
    paddingTop: 48,
    paddingBottom: 24,
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  nullButton: {
    marginBottom: 34,
    paddingVertical: 13,
    paddingHorizontal: 93,
    backgroundColor: 'white',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  null: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    lineHeight: 32,
    color: blackColor,
  },
  nullImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    top: 0,
    left: 0,
  },
  nullGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(73,212,146,0.8)',
    borderRadius: 20,
  },
});
