import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/core';
import CustomImage from '../../components/CustomImage';
import Text from '../../components/MyText';
import { windowWidth } from '../../constant/styles';
import Writing from '../../constant/images/Writing';
import { mediumFontFamily } from '../../constant/fonts';

const DetailImage = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;
  const { idx, images, ver, body } = params;

  const handleLoadMore = () => {};
  const bigScroll = useRef();
  const bottomScroll = useRef();

  const [currentIdx, setCurrentIdx] = useState(0);
  const onScrollEnd = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;
    const viewSize = nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIdx(pageNum);
  };

  const [imageList, setImageList] = useState(images);
  useEffect(() => {
    setImageList(images);
  }, [images]);

  const baseCropOption = {
    includeBase64: true,
    cropperCancelText: '취소',
    cropperChooseText: '선택',
    freeStyleCropEnabled: true,
    loadingLabelText: '',
  };
  const iosOptions = {
    height: 1000,
    width: 1000,
  };
  const handlePressEdit = item => {
    ImageCropPicker.openCropper(
      Platform.OS === 'ios'
        ? { ...baseCropOption, ...iosOptions, path: item.imageData.path }
        : { ...baseCropOption, path: item.imageData.path },
    ).then(image => {
      let list = imageList;

      list[currentIdx].image = image.path;
      list[currentIdx].imageData = image;
      setImageList(list);

      navigation.navigate('DetailImage', {
        idx: 0,
        images: imageList,
        ver,
        body,
      });
    });
  };

  const BigDatailImage = props => {
    const { item, index } = props;
    const { image } = item;

    return (
      <View style={{ marginTop: 0 }}>
        <View style={styles.topContainer}>
          <CustomImage
            style={styles.reviewImage}
            source={{ uri: image }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  const BottomImages = props => {
    const { item, index } = props;
    const { image } = item;

    const handleClick = page => {
      // ref.current.scrollToEnd();
      bigScroll.current.scrollToIndex({ index: page });
      bottomScroll.current.scrollToIndex({ index: page });
    };
    return (
      <TouchableWithoutFeedback
        style={styles.imageList}
        onPress={() => {
          handleClick(index);
        }}
      >
        <CustomImage
          style={styles.smallImage}
          source={{ uri: image }}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  };
  const handleOnLayout = () => {
    bigScroll.current.scrollToIndex({ index: idx, animated: false });
    bottomScroll.current.scrollToIndex({ index: idx, animated: false });
  };
  return (
    // <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
    <View style={styles.container}>
      <FlatList
        keyExtractor={({ image }, index) => {
          return `${image}-${index}`;
        }}
        onLayout={handleOnLayout}
        data={imageList}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        renderItem={BigDatailImage}
        ref={bigScroll}
        onMomentumScrollEnd={onScrollEnd}
      />

      {ver !== undefined && (
        <TouchableWithoutFeedback
          onPress={() => handlePressEdit(images[currentIdx])}
        >
          <View style={styles.editIconContainer}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CustomImage
                source={Writing}
                style={styles.editIcon}
                tintColor="white"
              />
              <Text style={styles.editText}>수정</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.bottomContainer}>
        <FlatList
          keyExtractor={({ image }, index) => {
            return `${image}-${index}`;
          }}
          onLayout={handleOnLayout}
          data={imageList}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={BottomImages}
          onEndReached={handleLoadMore}
          ref={bottomScroll}
        />
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default DetailImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  topContainer: {
    height: 680,
    width: windowWidth,
  },
  reviewImage: {
    width: windowWidth,
    height: '100%',
  },
  bottomContainer: {
    height: 108,
    paddingTop: 10,
    // height: 158,
    // paddingTop: 74.5,
    paddingLeft: 16,
  },
  imageList: {},
  smallImage: {
    width: 52,
    height: 52,
    marginRight: 5,
  },
  editIconContainer: {
    width: 71,
    height: 71,
    backgroundColor: 'rgba(0,0,0,0.5)',

    position: 'absolute',
    bottom: 127,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  editIcon: {
    width: 32,
    height: 32,
  },
  editText: {
    color: 'white',
    fontSize: 11,
    fontFamily: mediumFontFamily,
  },
});
