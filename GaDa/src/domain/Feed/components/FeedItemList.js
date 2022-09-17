import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import CustomRating from '../../../components/CustomRating';
import { MapImage, Sample } from '../../../constant/images/Temp';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import { backgroundColor, defaultColor, descriptionColor } from '../../../constant/colors';

const ItemSeparatorComponent = () => {
  return <View style={{ height: 10 }} />;
};
const FeedItemList = () => {
  const dataList = [
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 125,
    },
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 1.25,
    },
  ];
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.topContainer}>
          <View style={styles.userContainer}>
            <CustomImage source={Sample} style={styles.image} />
            <View style={styles.informationWrapper}>
              <Text style={styles.name}>{item.user.name}</Text>
              <CustomRating
                style={styles.rating}
                readonly
                size={11}
                score={item.score}
                starMargin={2.6}
                tintColor="white"
              />
            </View>
          </View>
        </View>
        <CustomImage source={MapImage} style={styles.headerImage}/>
        <View style={styles.radient}/>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.bottomWrapper}>
            <Text style={styles.description}>{`소요시간: ${
              item.time / 60
            }시간 / 거리: ${item.distance}km`}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        data={dataList}
        bounces={false}
        disableVirtualization={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item, index }) => renderItem({ item, index })}
        onEndReachedThreshold={0.7}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
};

export default FeedItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'pink',
   
    height: 270,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    zIndex: 999
  },
  userContainer: {
    marginBottom: 13,
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  informationWrapper: {
    marginStart: 9,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontFamily: boldFontFamily,
    fontSize: 13,
    letterSpacing: -0.26,
    color: 'white',
  },
  rating: {
    justifyContent: 'flex-start',
  },
  bottomContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    zIndex: 999,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: 'white',
  },
  description: {
    lineHeight: 22,
    color: descriptionColor,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  radient: {
    position: 'absolute',
    width: '100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0.3)'

  }
});
