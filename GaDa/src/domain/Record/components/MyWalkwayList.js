import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React from 'react';
import { MyImageS } from '../../../constant/images/Sample';
import CustomImage from '../../../components/CustomImage';
import { PinSample1, PinSample2 } from '../../../constant/images/PinSample';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import CustomRating from '../../../components/CustomRating';
import {
  backgroundColor,
  blackColor,
  borderColor,
} from '../../../constant/colors';
import { getDistance, getHour } from '../../../function';
import Text from '../../../components/MyText';

const ListFooterComponent = () => {
  return <View style={{ height: 30 }} />;
};
const MyWalkwayList = ({
  ListHeaderComponent,
  myWalks = [],
  handleDetailFeed,
  handleLoadMore,
}) => {
  const renderItem = ({ item, index }) => {
    // image는 뭔아이디야
    const {
      address,
      content,
      createdAt,
      distance,
      id,
      images,
      like,
      star,
      time,
      title,
      updatedAt,
      userImage,
      userName,
      vehicle,
      walkwayId,
      walkwayImage,
      walkwayTitle,
    } = item;
    return (
      <TouchableWithoutFeedback onPress={() => handleDetailFeed(id)}>
        <View style={styles.itemContainer}>
          <CustomImage
            style={styles.backgroundImage}
            source={{ uri: walkwayImage }}
          />
          <View style={styles.gradient} />
          <View style={styles.titleContainer}>
            <CustomImage source={{ uri: userImage }} style={styles.myImage} />
            <View style={styles.titleWrapper}>
              <Text style={styles.name}>{userName}</Text>
              <CustomRating
                score={star}
                size={11}
                readOnly
                starMargin={2.6}
                tintColor="white"
              />
            </View>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.information}>
              <Text style={styles.information}>
                소요시간: {getHour(time)}/{' '}
              </Text>
              <Text style={styles.information}>
                거리: {getDistance({ distance, unit: 'm' })}m{' '}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={styles.container}>
      {myWalks.length >= 1 ? (
        <FlatList
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          data={myWalks}
          bounces={false}
          disableVirtualization={false}
          renderItem={({ item, index }) => renderItem({ item, index })}
          onEndReachedThreshold={0.7}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          onEndReached={handleLoadMore}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <ListHeaderComponent />
            <View style={styles.nullContainer}>
              <CustomImage style={styles.nullImage} source={PinSample1} />
              <View style={styles.nullGradient} />
              <Text style={styles.nullTitle}>산책로를 만들고 공유하세요!</Text>
              <TouchableWithoutFeedback>
                <View style={styles.nullButton}>
                  <Text style={styles.null}>기록시작</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyWalkwayList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 20,
  },
  itemContainer: {
    height: 184,
    marginBottom: 20,
    justifyContent: 'space-between',

    marginHorizontal: 16,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.21)',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 16,
    borderRadius: 10,
    paddingTop: 20.5,
  },
  myImage: {
    width: 30,
    height: 30,
    marginEnd: 9,
    borderRadius: 100,
  },
  titleWrapper: {},
  name: {
    fontFamily: boldFontFamily,
    fontSize: 13,
    color: 'white',
  },
  informationContainer: {
    paddingBottom: 18,
    paddingStart: 16,
  },
  title: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  information: {
    color: borderColor,
    lineHeight: 22,
  },
  nullContainer: {
    marginHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  nullTitle: {
    paddingTop: 48,
    paddingBottom: 24,
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  nullButton: {
    marginBottom: 34,
    paddingVertical: 13,
    paddingHorizontal: 93,
    backgroundColor: 'white',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  null: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    lineHeight: 32,
    color: blackColor,
  },
  nullImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    top: 0,
    left: 0,
  },
  nullGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(73,212,146,0.8)',
    borderRadius: 20,
  },
});
