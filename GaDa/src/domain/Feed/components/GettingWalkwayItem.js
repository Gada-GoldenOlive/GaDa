import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { Check, CheckClicked } from '../../../constant/images/Check';
import { windowHeight, windowWidth } from '../../../constant/styles';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { getDistance, getHour, getTimeFromSec } from '../../../function';
import Text from '../../../components/MyText';
import { useEffect } from 'react';
import { getDetailWalk } from '../../../APIs/walk';

const GettingWalkwayItem = ({ item, index, clickItem, selectedItem }) => {
  const { id } = item;
  const [walkInfo, setWalkInfo] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const clickImage = isClicked ? CheckClicked : Check;
  const fetchData = async () => {
    const res = await getDetailWalk(id);
    if (res) {
      const { walk } = res;
      setWalkInfo(walk);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedItem === walkInfo) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [selectedItem]);

  const {
    createdAt,
    distance,
    finishStatus,
    image,
    pinCount,
    time,
    title,
    walkwayId,
  } = walkInfo;

  return (
    !loading && (
      <TouchableWithoutFeedback onPress={() => clickItem(walkInfo)}>
        <View style={styles.itemContainer}>
          <CustomImage
            style={styles.background}
            source={{ uri: image }}
            resizeMode="cover"
          />
          <View style={styles.gradient} />

          <CustomImage source={clickImage} style={styles.check} />

          <View style={styles.bottomContainer}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.description}>
              소요시간: {getHour(time)} / 거리 {getDistance({ distance, unit: 'm' })}m
              / 핀 {pinCount}개
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  );
};

export default GettingWalkwayItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: windowWidth,
    height: 184,
  },
  background: {
    position: 'absolute',
    width: windowWidth,
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: 'red'
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  check: {
    width: 48,
    height: 48,
    position: 'absolute',
    end: 16,
    top: 8,
    zIndex: 999,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 17,
    start: 16,
    zIndex: 999,
  },
  name: {
    color: 'white',
    fontSize: boldFontSize,
    fontFamily: boldFontFamily,
  },
  description: {
    color: 'white',
  },
  flatListContainer: {
    marginTop: 28,
  },
});
