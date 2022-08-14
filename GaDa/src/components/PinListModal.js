import React from 'react';
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

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const PinListModal = ({
  isVisible = false,
  closeModal,
  dataList = [
    {
      address: '성동구 왕십리로 12길',
      title: '여기 경사가 좀 높아요!',
      content: '입구쪽인데 생각보다 경사가 많이 높습니다.',
      image: 'image',
    },
    {
      address: '성동구 왕십리로 12길',
      title: '여기 경사가 좀 높아요!',
      content: '입구쪽인데 생각보다 경사가 많이 높습니다.',
      image: 'image',
    },
    {
      address: '성동구 왕십리로 12길',
      title: '여기 경사가 좀 높아요!',
      content: '입구쪽인데 생각보다 경사가 많이 높습니다.',
      image: 'image',
    },
    {
      address: '성동구 왕십리로 12길',
      title: '여기 경사가 좀 높아요!',
      content: '입구쪽인데 생각보다 경사가 많이 높습니다.',
      image: 'image',
    },
  ],
  selectedIndex = 0,
}) => {
  const renderItem = ({ item, index }) => {
    const { address, title, content, image } = item;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTopContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.numWrapper}>
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
        <CustomImage style={styles.image} source={Sample} />
      </View>
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
    height: '80%',
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
