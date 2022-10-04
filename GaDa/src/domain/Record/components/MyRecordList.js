import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { descriptionColorVer2 } from '../../../constant/colors';

const ItemSeparatorComponent = () => {
  return <View style={{ height: 14 }} />;
};
const ListFooterComponent = () => {
  return <View style={{ height: 50 }} />;
};
const MyRecordList = () => {
  const dataList = [
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
    {
      date: '3월 3주차',
      goal: { time: 500, distance: 1423 },
      real: { time: 2847, distance: 1423 },
    },
  ];
  const renderItem = ({ item, index }) => {
    const { date, goal, real } = item;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{date}(달성/목표)</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomWrapper}>
            <Text style={styles.real}>{real.time}분</Text>
            <Text style={styles.goal}>/ {goal.time}분</Text>
          </View>
          <View style={styles.bottomWrapper}>
            <Text style={styles.real}>{real.distance}m</Text>
            <Text style={styles.goal}>/ {goal.distance}m</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        data={dataList}
        bounces={false}
        disableVirtualization={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        renderItem={({ item, index }) => renderItem({ item, index })}
        onEndReachedThreshold={0.7}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
    </View>
  );
};

export default MyRecordList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    paddingTop: 12,
    paddingBottom: 17,
    backgroundColor: 'rgb(251,251,253)',
    borderColor: 'rgb(240,240,243)',
    borderWidth: 1,
    borderRadius: 10,
  },
  topContainer: {
    borderBottomColor: 'rgb(240, 240, 243)',
    borderBottomWidth: 1,
    paddingStart: 10,
    paddingBottom: 7.5,
  },
  title: {
    fontSize: 12,
  },
  bottomContainer: {
    paddingTop: 14.5,
    paddingStart: 10,
    paddingEnd: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  real: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  goal: {
    color: descriptionColorVer2,
  },
});
