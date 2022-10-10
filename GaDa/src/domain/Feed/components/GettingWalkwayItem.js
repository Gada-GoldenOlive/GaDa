import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { Check } from '../../../constant/images/Check';
import { windowWidth } from '../../../constant/styles';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { getDistance } from '../../../function';
import Text from '../../../components/MyText';

const GettingWalkwayItem = ({item, index}) => {
    const { name, time, distance, date } = item;
    const [isClicked, setIsClicked] = useState(false);
    return (
      <View style={styles.itemContainer}>
        <CustomImage style={styles.background} source={MapImage} />
        <View style={styles.gradient} />
        <TouchableWithoutFeedback>
          <CustomImage source={Check} style={styles.check} />
        </TouchableWithoutFeedback>
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>
            소요시간: {time}분 / 거리 {getDistance({distance, unit: 'm'})}m / 핀 5개
          </Text>
        </View>
      </View>
    );
}

export default GettingWalkwayItem

const styles = StyleSheet.create({
    itemContainer: {
        width: windowWidth,
        height: 184,
      },
      background: {
        position: 'absolute',
      },
      gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      check: {
        width: 48,
        height: 48,
        position: 'absolute',
        end: 16,
        top: 8,
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
})