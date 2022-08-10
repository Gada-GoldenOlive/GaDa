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
import CustomButton from '../../../components/CutomButton';
const ItemSeparatorComponent = () => {
  return <View style={styles.separatorContainer} />;
};

const PinTabScreen = () => {
  const titles = ['핀', '후기'];
  const ref = React.useRef(PagerView);
  const handlePage = p => {
    ref.current.setPage(p);
  };
  // pin
  const tempPinList = [
    { id: 'a', title: 'pin1', content: 'hey', image: 'hey' },
    { id: 'b', title: 'pin2', content: 'hey', image: 'hey' },
    { id: 'c', title: 'pin3', content: 'hey', image: 'hey' },
    { id: 'd', title: 'pin4', content: 'hey', image: 'hey' },
    { id: 'e', title: 'pin5', content: 'hey', image: 'hey' },
    { id: 'f', title: 'pin6', content: 'hey', image: 'hey' },
    { id: 'g', title: 'pin7', content: 'hey', image: 'hey' },
  ];

  const pinHeaderComponent = () => {
    return <FirstPin />;
  };
  const pinFooterComponent = () => {
    return <LastPin />;
  };
  const renderPin = ({ item, index }) => {
    const { title } = item;
    return (
      <View>
        <PinItem item={item} index={index} />
      </View>
    );
  };

  // review
  const tempReviewlist = [
    {
      id: 'a',
      title: 'review1',
      vehicle: 'AUTO',
      star: 3,
      content:
        "이제 우리가 다시 다시 써 불붙으면 Non Stop 보이는 대로 I'm just having fun 가볍게 난 Game start 갈아치운 Rank huh 심길 건드리는 말들도 씹어 먹고 퉤 해 뱉어 껌처럼 Chess판 위에도 Checkmate",
      image: 'image',
      userId: 'aa',
      userName: 'SUMMER',
    },
    {
      id: 'ab',
      title: 'review2',
      vehicle: 'AUTO',
      star: 4.2,
      content: '좋아요',
      image: 'image',
      userId: 'aa',
      userName: 'SUMMER',
    },
    {
      id: 'bb',
      title: 'review3',
      vehicle: 'AUTO',
      star: 5,
      content: '좋아요',
      image: 'image',
      userId: 'aa',
      userName: 'SUMMER',
    },
  ];
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
          <Text style={styles.num}>4.3</Text>
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
        {tempPinList.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={tempPinList}
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
        {tempReviewlist.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={tempReviewlist}
              disableVirtualization={false}
              ListHeaderComponent={reviewHeaderComponent}
              renderItem={({ item, index }) => renderReview({ item, index })}
              onEndReachedThreshold={0.7}
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
      <CustomButton title="경로 시작" />
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
});
