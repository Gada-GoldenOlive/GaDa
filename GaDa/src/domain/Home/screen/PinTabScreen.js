import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';
import PagerTabButtons from '../../../components/PagerView/PagerTabButtons';
import Text from '../../../components/MyText';
import FirstPin from '../components/FirstPin';
import { windowHeight } from '../../../constant/styles';
import PinItem from '../components/PinItem';
import Review from '../components/Review';
import { blackColor, buttonColor } from '../../../constant/colors';
import LastPin from '../components/LastPin';
import StartButton from '../components/StartButton';
import CustomImage from '../../../components/CustomImage';
import StarIcon from '../../../constant/images/Star';
import { boldFontFamily } from '../../../constant/fonts';
const ItemSeparatorComponent = () => {
  return <View style={styles.separatorContainer} />;
};
const ListFooterComponent = () => {
  return <View style={styles.footer} />;
};

const PinTabScreen = ({ pinList, reviewList, average, handleLoadMore }) => {
  const titles = ['핀', '후기'];
  const ref = React.useRef(PagerView);
  const handlePage = p => {
    ref.current.setPage(p);
  };
  const pinHeaderComponent = () => {
    return <FirstPin />;
  };
  const pinFooterComponent = () => {
    return (
      <View style={styles.footer}>
        <LastPin />
      </View>
    );
  };
  const renderPin = ({ item, index }) => {
    return (
      <View>
        <PinItem item={item} index={index} />
      </View>
    );
  };

  //review
  const reviewHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>평점</Text>
        <View style={styles.rateWrapper}>
          <CustomImage
            source={StarIcon}
            style={styles.starIcon}
            tintColor={buttonColor}
          />
          <Text style={styles.num}>{average}</Text>
        </View>
      </View>
    );
  };
  const renderReview = ({ item, index }) => {
    return <Review review={item} />;
  };

  return (
    <View style={styles.container}>
      <PagerTabButtons
        titles={titles}
        handlePage={handlePage}
        initialIndex={0}
      />
      <PagerView
        initialPage={0}
        scrollEnabled={false}
        style={styles.pagerView}
        ref={ref}
      >
        {pinList.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={pinList}
              bounces={false}
              disableVirtualization={false}
              ItemSeparatorComponent={ItemSeparatorComponent}
              ListHeaderComponent={pinHeaderComponent}
              ListFooterComponent={pinFooterComponent}
              renderItem={({ item, index }) => renderPin({ item, index })}
              onEndReachedThreshold={0.7}
              contentContainerStyle={styles.pinListContainer}
              keyExtractor={(item, index) => `${item.id}-${index}`}
            />
          </View>
        ) : (
          <View style={styles.nullContainer}>
            <Text>핀이 없습니다</Text>
          </View>
        )}
        {reviewList.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={reviewList}
              bounces={false}
              disableVirtualization={false}
              ListHeaderComponent={reviewHeaderComponent}
              ListFooterComponent={ListFooterComponent}
              renderItem={({ item, index }) => renderReview({ item, index })}
              onEndReachedThreshold={0.7}
              onEndReached={handleLoadMore}
              contentContainerStyle={styles.pinListContainer}
              keyExtractor={(item, index) => `${item.id}-${index}`}
            />
          </View>
        ) : (
          <View style={styles.nullContainer}>
            <Text>리뷰가 없습니다</Text>
          </View>
        )}
      </PagerView>
    </View>
  );
};

export default PinTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
    height: '100%',
  },
  pinListContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  separatorContainer: {
    height: 12,
    width: '100%',
    borderStartColor: buttonColor,
    borderStartWidth: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: boldFontFamily,
    letterSpacing: -0.28,
    color: blackColor,
  },
  rateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  num: {
    color: buttonColor,
    fontFamily: boldFontFamily,
    fontSize: 18,
    letterSpacing: -0.36,
  },
  starIcon: {
    height: 16,
    width: 16,
    marginEnd: 6,
  },
  nullContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingBottom: 100,
  },
});
