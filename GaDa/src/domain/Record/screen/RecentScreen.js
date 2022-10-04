import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { windowWidth } from '../../../constant/styles';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { blackColor, mainColor } from '../../../constant/colors';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { getDistance } from '../../../function';

const RecentScreen = ({ handleDetailPin }) => {
  const renderItem = ({ item, index }) => {
    const { name, distance, time, date } = item;
    return (
      <TouchableWithoutFeedback onPress={handleDetailPin}>
        <View
          style={[styles.itemContainer, index % 2 === 0 && { marginEnd: 11 }]}
        >
          <Text style={styles.time}>{date}</Text>
          <View style={styles.contentView}>
            <CustomImage style={styles.background} source={MapImage} />
            <View style={styles.gradient} />
            <View style={styles.bottomWrapper}>
              <View style={styles.percentWrapper}>
                <Text style={styles.percent}>40%</Text>
              </View>
              <Text style={styles.distance}>{distance}m</Text>
            </View>
            <Text style={styles.distance}>{getDistance({distance, unit: 'm'})}m</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const dataList = [
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 125,
      date: '2022.04.23',
    },
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 125,
      date: '2022.04.23',
    },
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 125,
      date: '2022.04.23',
    },
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 125,
      date: '2022.04.23',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        scrollEventThrottle={16}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={dataList}
        bounces={false}
        disableVirtualization={false}
        renderItem={({ item, index }) => renderItem({ item, index })}
        onEndReachedThreshold={0.7}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
    </View>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: (windowWidth - 32 - 11) / 2,
    marginTop: 25,
  },
  time: {
    color: '#9e9e9e',
    marginBottom: 6,
  },
  contentView: {
    borderRadius: 4,
    width: '100%',
    height: 94,
  },
  background: {
    position: 'absolute',
    borderRadius: 4,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 4,
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 9,
    paddingBottom: 8,
  },
  percentWrapper: {
    backgroundColor: mainColor,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
  },
  percent: {
    color: 'white',
    fontFamily: boldFontFamily,
  },
  distance: {
    color: 'white',
    fontFamily: boldFontFamily,
  },
  name: {
    color: blackColor,
    fontSize: boldFontSize,
    fontFamily: boldFontFamily,
  },
});