import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { useRef } from 'react';
import { windowWidth } from '../../../constant/styles';
import { useNavigation } from '@react-navigation/core';

const ReviewImageList = ({ images = [], handleNavigate = null }) => {
  const bottomScroll = useRef();
  const BottomImages = props => {
    const { item, index } = props;
    const { id, url } = item; 
    const handleClick = page => {
      bottomScroll.current.scrollToIndex({ index: page });
      if(handleNavigate) {
        handleNavigate(images, page)
      }

    };
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleClick(index);
        }}
      >
        <View style={[styles.imageList, index === images.length - 1 && {marginEnd: 16}]}>
          <CustomImage
            style={styles.smallImage}
            source={{ uri: url }}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const handleOnLayout = () => {
    bottomScroll.current.scrollToIndex({ index: 0, animated: false });
  };
  return (
    images.length > 0 && (
      <View style={styles.container}>
        <FlatList
          keyExtractor={({ image }, index) => {
            return `${image}-${index}`;
          }}
          onLayout={handleOnLayout}
          data={images}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={BottomImages}
          ref={bottomScroll}
        />
      </View>
    )
  );
};

export default ReviewImageList;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 25,
    paddingBottom: 25,
  },
  imageList: {
    flex: 1,
    marginStart: 16,
  },
  smallImage: {
    width: 97,
    height: 97,
  },
});
