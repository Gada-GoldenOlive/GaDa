import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import CustomImage from './CustomImage';
import Polygon from '../constant/images/Polygon';
import { blackColor } from '../constant/colors';
import BottomUpmodal from './BottomUpmodal';

const FilteringButton = ({ itemList = ['거리순', '최신순', '좋아요순'] }) => {
  const [clickedItem, setClickedItem] = useState(itemList[0]);
  const [modalVisible, setModalVisibile] = useState(false);
  const handleClick = item => {
    setClickedItem(item);
    setModalVisibile(false)
  };

  const handleOpenModal = () => {
    setModalVisibile(true);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOpenModal}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{clickedItem}</Text>
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
