import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { boldFontFamily } from '../constant/fonts';
import { blackColor, borderColor, defaultColor } from '../constant/colors';
import { windowHeight, windowWidth } from '../constant/styles';
import Modal from 'react-native-modal';
import Text from './MyText';

const BottomUpmodal = ({
  isVisible,
  closeModal,
  list,
  clickedItem,
  handleClick,
}) => {
  const renderItem = (item, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleClick(item);
        }}
        key={item.title}
      >
        <View>
          {index !== 0 && <View style={styles.view} />}
          <View style={styles.itemContainer}>
            <Text
              style={[
                styles.itemText,
                clickedItem === item && {
                  color: blackColor,
                  fontFamily: boldFontFamily,
                },
              ]}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Modal
      style={styles.modalContainer}
      animationIn="slideInUp"
      isVisible={isVisible}
      onBackdropPress={closeModal}
      hasBackdrop
      deviceHeight={windowHeight}
      deviceWidth={windowWidth}
      backdropColor="gray"
      backdropOpacity={0.5}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.listContainer}>
          {list.map((item, index) => {
            return renderItem(item, index);
          })}
        </View>
      </View>
    </Modal>
  );
};

export default BottomUpmodal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 999,
    bottom: -22,
  },
  modalWrapper: {
    backgroundColor: 'white',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15.5,
    paddingBottom: 63.5,
    paddingHorizontal: 16,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  view: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgb(232,232,232)',
  },
  listContainer: {
    width: '100%',
  },
  itemContainer: {
    paddingBottom: 22.5,
    paddingTop: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    position: 'absolute',
    width: 18,
    height: 18,
    top: 0,
    left: 0,
  },
  itemText: {
    fontFamily: boldFontFamily,
    lineHeight: 22,
    color: defaultColor,
  },
});
