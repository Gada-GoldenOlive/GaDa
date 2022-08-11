import {
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import Text from '../../../components/MyText';
import {
  activeDotColor,
  borderColor,
  buttonColor,
  dotColor,
} from '../../../constant/colors';
import { windowWidth } from '../../../constant/styles';
import ExpandingDots from '.././../../components/ExpandingDots';
import { boldFontFamily, mediumFontFamily } from '../../../constant/fonts';
const WIDTH = 204;
const HEIGHT = 116;
const EMPTY_ITEM_SIZE = (windowWidth - WIDTH) / 2;
const SPACING = 10;

const WalkwayListComponent = ({ list: prevList }) => {
  const [focusedIndex, setFocusedIndex] = useState(1);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const topScroll = useRef(null);

  const list = [{ key: 'empty-left' }, ...prevList, { key: 'empty-right' }];

  const goRight = () => {
    if (focusedIndex >= 1 && focusedIndex < list.length - 2) {
      setFocusedIndex(focusedIndex + 1);
      topScroll.current.scrollToOffset({
        animated: true,
        offset: WIDTH * focusedIndex,
      });
    }
  };

  const goLeft = () => {
    if (focusedIndex >= 2 && focusedIndex <= list.length) {
      setFocusedIndex(focusedIndex - 1);
      topScroll.current.scrollToOffset({
        animated: true,
        offset: WIDTH * (focusedIndex - 2),
      });
    }
  };
  const renderItem = ({ item, index }) => {
    if (!item.title) return <View style={{ width: EMPTY_ITEM_SIZE }} />;

    const { id, address, title, pinCount } = item;
    const inputRange = [
      (index - 2) * WIDTH,
      (index - 1) * WIDTH,
      index * WIDTH,
    ];
    const containerWidth = scrollX.interpolate({
      inputRange,
      outputRange: ['100%', '100%', '100%'],
      extrapolate: 'clamp',
    });
    const rightPosition = scrollX.interpolate({
      inputRange,
      outputRange: [-10, 0, 10],
      extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.75, 1, 0.75],
      extrapolate: 'clamp',
    });
    const pinWrapper = scrollX.interpolate({
      inputRange,
      outputRange: ['rgb(181,181,181)', 'rgb(56,176,119)', 'rgb(181,181,181)'],
      extrapolate: 'clamp',
    });
    const titleColor = scrollX.interpolate({
      inputRange,
      outputRange: ['rgb(181,181,181)', 'white', 'rgb(181,181,181)'],
      extrapolate: 'clamp',
    });
    console.log(focusedIndex, index);
    return (
      <Animated.View
        style={[
          {
            width: WIDTH,
            height: HEIGHT,
            right: rightPosition,
            backgroundColor: 'rgb(224,224,224)',
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.14,
            elevation: 4,
          },
          focusedIndex === index && {
            backgroundColor: 'rgb(73,212,146)',
            zIndex: 100,
          },
          focusedIndex !== index && {
            zIndex: -1,
          },
        ]}
      >
        <TouchableWithoutFeedback
        // onPress={() => handleNavigateDetailProduct(item)}
        >
          <Animated.View
            style={{
              paddingHorizontal: 15,
              borderRadius: 3,
              width: containerWidth,
              height: containerWidth,
              position: 'absolute',
              paddingTop: 12,
              opacity,
            }}
          >
            <Animated.Text style={[styles.itemTitle, { color: titleColor }]}>
              {title}
            </Animated.Text>
            <Animated.View style={styles.pinContainer}>
              <Animated.View
                style={[styles.pinWrapper, { backgroundColor: pinWrapper }]}
              >
                <Animated.Text style={styles.pin}>
                  핀 {pinCount}개
                </Animated.Text>
              </Animated.View>
              <Animated.View />
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };
  const renderList = () => {
    return (
      <View style={styles.listContainer}>
        <Animated.FlatList
          data={list}
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces={false}
          removeClippedSubviews={false}
          pagingEnabled
          decelerationRate={Platform.OS === 'ios' ? 0.3 : 0.95}
          // decelerationRate={'fast'}
          renderToHardwareTextureAndroid
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: 10,
            justifyContent: 'center',
          }}
          keyExtractor={(item, index) => index}
          scrollEnabled={true}
          ref={topScroll}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          snapToInterval={WIDTH}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          // onViewableItemsChanged={_onViewableItemsChanged}
          scrollEventThrottle={16}
          renderItem={renderItem}
        />
        <ExpandingDots
          data={prevList}
          expandingDotWidth={23}
          scrollX={scrollX}
          inActiveDotOpacity={0.9}
          width={WIDTH}
          dotStyle={{
            width: 7,
            height: 4,
            borderRadius: 2,
            marginRight: 5,
          }}
          inActiveDotColor={dotColor}
          activeDotColor={activeDotColor}
          containerStyle={{
            position: 'relative',
            marginTop: 25,
            // paddingBottom: 38,
          }}
        />
        <TouchableWithoutFeedback onPress={goLeft}>
          <View
            style={{
              width: windowWidth / 2 - WIDTH / 2,
              height: '50%',
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: 16,
              left: 0,
              zIndex: 10,
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={goRight}>
          <View
            style={{
              width: windowWidth / 2 - WIDTH / 2,
              height: '100%',
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: 16,
              right: 0,
              zIndex: 10,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  const config = {
    velocityThreshold: 0.05,
    directionalOffsetThreshold: 50,
    gestureIsClickThreshold: Platform.OS === 'ios' ? 20 : 9999,
  };

  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeRight={goLeft}
        onSwipeLeft={goRight}
        config={config}
      >
        {renderList()}
      </GestureRecognizer>
    </View>
  );
};

export default WalkwayListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 17,
  },
  dotStyle: {
    width: 7,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 5,
    backgroundColor: dotColor,
  },
  itemTitle: {
    fontFamily: boldFontFamily,
    fontSize: 16,
  },
  pinContainer: {
    flexDirection: 'row',
  },
  pinWrapper: {
    // width: 48,
    marginTop: 4,
    paddingVertical: 3,
    paddingHorizontal: 5.1,
  },
  pin: {
    fontFamily: mediumFontFamily,
    color: 'rgb(248,248,248)',
  },
});