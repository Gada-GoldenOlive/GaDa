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
  buttonColor,
  dotColor,
} from '../../../constant/colors';
import { windowWidth } from '../../../constant/styles';
import ExpandingDots from '.././../../components/ExpandingDots';
const WIDTH = 204;
const HEIGHT = 116;
const EMPTY_ITEM_SIZE = (windowWidth - WIDTH) / 2;
const SPACING = 12;

const WalkwayListComponent = ({ list }) => {
  const [focusedIndex, setFocusedIndex] = useState(1);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const bottomScroll = useRef(null);
  const topScroll = useRef(null);
  const goRight = () => {
    if (focusedIndex >= 1 && focusedIndex < list.length - 2) {
      setFocusedIndex(focusedIndex + 1);
      bottomScroll.current.scrollToOffset({
        animated: true,
        offset: windowWidth * focusedIndex,
      });
      topScroll.current.scrollToOffset({
        animated: true,
        offset: WIDTH * focusedIndex,
      });
    }
  };

  const goLeft = () => {
    if (focusedIndex >= 2 && focusedIndex < list.length) {
      setFocusedIndex(focusedIndex - 1);
      bottomScroll.current.scrollToOffset({
        animated: true,
        offset: windowWidth * (focusedIndex - 2),
      });
      topScroll.current.scrollToOffset({
        animated: true,
        offset: WIDTH * (focusedIndex - 2),
      });
    }
  };
  const renderItem = props => {
    const { item } = props;
    console.log(item);

    return (
      <View style={styles.itemContainer}>
        <Text>hi</Text>
      </View>
    );
  };
  const renderList = () => {
    return (
      <View style={styles.listContainer}>
        <Animated.FlatList
          data={list}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          removeClippedSubviews={false}
          pagingEnabled
          decelerationRate={Platform.OS === 'ios' ? 0.3 : 0.95}
          renderToHardwareTextureAndroid
          contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: 10,
            justifyContent: 'center',
            backgroundColor: 'blue',
          }}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
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
        {/* <TouchableWithoutFeedback>
          <View style={styles.focusedProductContainer}>
            <Text style={styles.focusedProductTypeText}>hy</Text>
          </View>
        </TouchableWithoutFeedback> */}
        <ExpandingDots
          data={list}
          expandingDotWidth={23}
          scrollX={scrollX}
          inActiveDotOpacity={0.9}
          width={WIDTH}
          dotStyle={styles.dotStyle}
          containerStyle={{
            position: 'relative',
            marginTop: 25,
            // paddingBottom: 38,
          }}
        />
        <TouchableWithoutFeedback onPress={goLeft}>
          <View
            style={[
              {
                width: windowWidth / 2 - WIDTH / 2,
                height: '100%',
                // backgroundColor: 'gray',
                position: 'absolute',
                zIndex: 10,
              },
              Platform.OS === 'android' && styles.goLeft,
            ]}
          ></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={goRight}>
          <View
            style={[
              {
                width: windowWidth / 2 - WIDTH / 2,
                height: '50%',
                // backgroundColor: 'pink',
                position: 'absolute',
                right: 0,
                zIndex: 10,
              },
              Platform.OS === 'android' && styles.goRight,
            ]}
          ></View>
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
  container: { backgroundColor: 'pink' },
  listContainer: { paddingTop: 17 },
  focusedProductTypeContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 7,

    flexDirection: 'row',

    zIndex: 9999,

    paddingVertical: 5,
  },
  goLeft: {
    width: windowWidth / 2 - WIDTH / 2,
    backgroundColor: 'blue',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: 15.5,
    justifyContent: 'center',
  },
  goRight: {
    width: windowWidth / 2 - WIDTH / 2,
    height: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15.5,
  },
  dotStyle: {
    width: 7,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 5,
    backgroundColor: dotColor,
  },
  itemContainer: {
    backgroundColor: 'red',
    width: WIDTH,
  },
  focusedProductContainer: {
    backgroundColor: 'blue',
    marginBottom: 28,
    width: windowWidth,
    paddingStart: 15,
    paddingEnd: 17,
  },
});
