import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Text from './MyText';
import { boldFontFamily, boldFontSize } from '../constant/fonts';
import {
  activeDotColor,
  backgroundColor,
  blackColor,
  buttonColor,
  descriptionColor,
  mainColor,
} from '../constant/colors';
import { windowHeight, windowWidth } from '../constant/styles';
import CustomImage from './CustomImage';
import Writing from '../constant/images/Writing';
import Delete from '../constant/images/Delete';
import { Sample } from '../constant/images/Temp';
import { getRandomImage } from '../function';
import { PinSampel2, PinSample1 } from '../constant/images/PinSample';

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const PinListModal = ({
  isVisible = false,
  closeModal,
  dataList = [],
  selectedIndex = 0,
  address,
}) => {
  const [selectIndex, setSelectIndex] = useState(selectedIndex);
  const renderItem = ({ item, index }) => {
    const { title, content, image } = item;
    console.log(image)
    console.log('hh', image === "undefined")
    const isFocused = selectIndex === index;
    const sampleImage = index % 2 === 0 ? PinSample1 : PinSampel2
    return (
      <TouchableWithoutFeedback onPress={() => setSelectIndex(index)}>
        <View style={[styles.itemContainer, !isFocused && { opacity: 0.5 }, index === dataList.length - 1 && {paddingBottom: 25}]}>
          <View style={styles.itemTopContainer}>
            <View style={styles.addressContainer}>
              <Text
                style={[
                  styles.address,
                  !isFocused && { color: 'rgb(158,158,158)' },
                ]}
              >
                {address}
              </Text>
              <View
                style={[
                  styles.numWrapper,
                  !isFocused && { backgroundColor: 'rgb(158,158,158)' },
                ]}
              >
                <Text style={styles.num}>핀{index + 1}</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <CustomImage
                source={Writing}
                style={[styles.icon, { marginEnd: 20 }]}
              />
              <CustomImage source={Delete} style={styles.icon} />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
          </View>
          {image !== "undefined" && image !== null  ? (
                <CustomImage source={{ uri: image }} style={styles.image} resizeMode="contain" />
              ) : (
                <CustomImage source={sampleImage} style={styles.image} />
              )}
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
        <View style={styles.bar} />
        <View style={styles.container}>
          {dataList.length >= 1 ? (
            <FlatList
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={dataList}
              bounces={false}
              initialScrollIndex={selectedIndex}
              disableVirtualization={false}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={({ item, index }) => renderItem({ item, index })}
              onEndReachedThreshold={0.7}
              contentContainerStyle={styles.pinListContainer}
              keyExtractor={(item, index) => `${item.id}-${index}`}
            />
          ) : (
            <View style={styles.nullContainer}>
              <Text>핀이 없습니다</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PinListModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    left: -18,
    bottom: -20,
    justifyContent: 'flex-end',
    flex: 1,
    height: '70%',
  },
  modalWrapper: {
    width: windowWidth,
    paddingTop: 12,
    paddingBottom: 25,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bar: {
    backgroundColor: backgroundColor,
    borderRadius: 2.5,
    width: 50,
    height: 4,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingTop: 28,
  },
  separator: {
    width: windowWidth,
    height: 8,
    backgroundColor: 'rgb(243,243,243)',
    marginBottom: 14,
  },
  itemContainer: {
    paddingBottom: 16,

  },
  itemTopContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 12,
    color: activeDotColor,
    marginEnd: 7,
  },
  numWrapper: {
    paddingHorizontal: 6,
    backgroundColor: activeDotColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    color: 'white',
    fontSize: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 9,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: blackColor,
    marginBottom: 3,
  },
  content: {
    lineHeight: 22,
  },
  image: {
    height: 173,
  
    },
  nullContainer: {
    width: '100%',
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
