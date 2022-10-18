import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import CustomImage from './CustomImage';
import Polygon from '../constant/images/Polygon';
import { blackColor } from '../constant/colors';
import BottomUpmodal from './BottomUpmodal';
import Text from './MyText';
import { useEffect } from 'react';

const FilteringButton = ({ setOrder }) => {
  const itemList = [
    { title: '거리순', value: 'DISTANCE' },
    { title: '최신순', value: 'LATEST' },
    { title: '좋아요순', value: 'LIKE' },
  ];
  const [clickedItem, setClickedItem] = useState(itemList[0]);
  const [modalVisible, setModalVisibile] = useState(false);

  const handleClick = item => {
    setClickedItem(item);    
    setModalVisibile(false);
    setOrder(item.value);
  };

  const handleOpenModal = () => {
    setModalVisibile(true);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOpenModal}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{clickedItem.title}</Text>
          <CustomImage style={styles.polygon} source={Polygon} />
        </View>
      </TouchableWithoutFeedback>
      <BottomUpmodal
        isVisible={modalVisible}
        closeModal={() => setModalVisibile(false)}
        list={itemList}
        clickedItem={clickedItem}
        handleClick={handleClick}
      />
    </View>
  );
};

export default FilteringButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wrapper: {
    backgroundColor: 'white',
    paddingStart: 13,
    paddingEnd: 12,
    paddingTop: 7,
    paddingBottom: 6,
    borderRadius: 15.5,
    borderWidth: 1,
    borderColor: 'rgb(237,237,237)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: blackColor,
    marginRight: 5,
  },
  polygon: {
    width: 8,
    height: 8,
  },
});
