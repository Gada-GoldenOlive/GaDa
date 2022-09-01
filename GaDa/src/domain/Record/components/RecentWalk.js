import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PinSample1, PinSample2 } from '../../../constant/images/PinSample';
import CustomImage from '../../../components/CustomImage';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { mainColor } from '../../../constant/colors';

const RecentWalk = ({}) => {
  const tempList = [
    {
      title: '성동구 왕십리로 산책길',
      time: 25,
      distance: 1249,
      percent: 40,
      image: PinSample1,
    },
    {
      title: '성동구 왕십리로 산책길',
      time: 25,
      distance: 1249,
      percent: 40,
      image: PinSample2,
    },
    {
      title: '성동구 왕십리로 산책길',
      time: 25,
      distance: 1249,
      percent: 40,
      image: PinSample1,
    },
  ];
  const renderItem = ({ item, index }) => {
    const { title, time, distance, percent, image } = item;
    return (
      <View style={styles.itemContainer}>
        <CustomImage source={image} style={styles.backgroundImage} />
        <View style={styles.gradient} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.informationContainer}>
            <Text style={styles.information}>
              <Text>{time}분 / </Text>
              <Text>{distance}m</Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomWrapper}>
            <Text style={styles.percent}>{percent}%</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={tempList}
        horizontal
        disableVirtualization={false}
        contentContainerStyle={styles.itemWrapper}
        renderItem={({ item, index }) => renderItem({ item, index })}
        onEndReachedThreshold={0.7}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
};

export default RecentWalk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
  },
  itemContainer: {
    width: 236,
    height: 132,
    marginStart: 16,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    position: 'absolute',
    borderRadius: 10,
  },
  gradient: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  titleContainer: {
    marginTop: 20,
    paddingStart: 10,
  },
  title: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  informationContainer: {
    marginTop: 6,
  },
  information: {
    color: 'white',
    fontSize: 16,
  },
  bottomContainer: {
    alignItems: 'flex-end',
    paddingEnd: 10,
    paddingBottom: 10,
  },
  bottomWrapper: {
    backgroundColor: mainColor,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  percent: {
    fontFamily: boldFontFamily,
    color: 'white',
  },
});