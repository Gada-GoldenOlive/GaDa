import React, { useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import ExpandingDot from '../../../components/ExpandingDots';
import { useNavigation } from '@react-navigation/core';
import Text from '../../../components/MyText';
import CustomImage from '../../../components/CustomImage';

import { buttonColor, starBackgroundColor } from '../../../constant/colors';

import {
  UserGuide1,
  UserGuide2,
  UserGuide3,
  UserGuide4,
  UserGuide5,
  UserGuide6,
} from '../../../constant/images/UserGuide';
import { windowHeight, windowWidth } from '../../../constant/styles';
import { boldFontFamily, extraBoldFontFamily } from '../../../constant/fonts';
import HeaderBackButton from '../../../components/BackButton';
import CustomButton from '../../../components/CustomButton';

const UserGuideLineScreen = () => {
  const SLIDER_DATA = [
    {
      key: '1',
      mainImg: UserGuide1,
    },
    {
      key: '2',
      mainImg: UserGuide2,
    },
    {
      key: '3',
      mainImg: UserGuide3,
    },
    {
      key: '4',
      mainImg: UserGuide4,
    },
    {
      key: '5',
      mainImg: UserGuide5,
    },
    {
      key: '6',
      mode: 'start',
      mainImg: UserGuide6,
    },
  ];

  const navigation = useNavigation();
  const [page, setPage] = useState(0);

  const handleStartApp = () => {
    navigation.goBack();
  };
  const onScrollEnd = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;
    const viewSize = nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setPage(pageNum);
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();

  const handleNextButton = currentPage => {
    ref.current.scrollToIndex({ index: currentPage + 1 });
    setPage(currentPage + 1);
  };
  const handlePrevButton = currentPage => {
    if (page !== 0) {
      ref.current.scrollToIndex({ index: currentPage - 1 });
      setPage(currentPage - 1);
    }
  };

  const renderItem = props => {
    const { item } = props;
    const { mainImg, mode = 'default' } = item;

    return mode === 'start' ? (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={() => handlePrevButton(page)}>
          <View style={styles.left} />
        </TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
          <CustomImage source={mainImg} style={styles.mainImg} />
        </View>
        <TouchableWithoutFeedback onPress={handleStartApp}>
          <View style={styles.startBtn}>
            <Text style={styles.buttonText}>시작하기</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ) : (
      <View style={styles.itemContainer}>
        <View style={styles.mainContainer}>
          <TouchableWithoutFeedback onPress={() => handlePrevButton(page)}>
            <View style={styles.left} />
          </TouchableWithoutFeedback>
          <CustomImage
            source={mainImg}
            style={styles.mainImg}
            resizeMode="contain"
          />
          <TouchableWithoutFeedback onPress={() => handleNextButton(page)}>
            <View style={styles.right} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={SLIDER_DATA}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        pagingEnabled
        horizontal
        decelerationRate="normal"
        scrollEventThrottle={16}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}
      />
      {page !== 5 && (
        <View style={styles.bottomContainer}>
          <View style={styles.iconContainer}>
            <ExpandingDot
              data={SLIDER_DATA.slice(0, 5)}
              expandingDotWidth={7.5}
              scrollX={scrollX}
              inActiveDotOpacity={1}
              dotStyle={{
                width: 7.5,
                height: 7.5,
                borderRadius: 100,
                marginRight: 10.6,
              }}
              inActiveDotColor={starBackgroundColor}
              activeDotColor={buttonColor}
              width={windowWidth}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default UserGuideLineScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width: windowWidth,
    //backgroundColor: 'red',
    backgroundColor: 'rgb(40,40,40)',
  },
  mainContainer: {
    flex: 1,
  },
  mainImg: {
    height: windowHeight,
    width: windowWidth,
  },
  bottomContainer: {
    width: windowWidth,
    position: 'absolute',
    bottom: 20,
  },
  iconContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
    backgroundColor: 'blue',
  },
  startBtn: {
    width: windowWidth - 32,
    zIndex: 999,
    backgroundColor: buttonColor,
    paddingVertical: 17,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: '35%',
  },
  buttonText: {
    fontFamily: boldFontFamily,
    fontSize: 18,
    color: 'white',
  },
  right: {
    //backgroundColor: 'red',
    position: 'absolute',
    width: 60,
    height: windowHeight,
    right: 0,
  },
  left: {
    position: 'absolute',
    width: 60,
    height: windowHeight,
    left: 0,
    zIndex: 999,
  },
});
