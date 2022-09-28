import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import CustomRating from '../../../components/CustomRating';
import { MapImage, Sample } from '../../../constant/images/Temp';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import {
  backgroundColor,
  defaultColor,
  descriptionColor,
} from '../../../constant/colors';
import { heartClicked } from '../../../constant/images/Heart';
import FeedBookmark from '../../../components/FeedBookmark';
import FeedItem from './FeedItem';
import GettingWalkwayItem from './GettingWalkwayItem';

const ItemSeparatorComponent = () => {
  return <View style={{ height: 1 }} />;
};
const FeedItemList = ({type = 'feed'}) => {
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
    {
      user: { image: null, name: '부산 갈매기' },
      score: 5,
      liked: false,
      image: null,
      name: '수영구 광안해변로 산책길',
      time: 60,
      distance: 1.25,
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
   return type === 'recent' ? (
    <GettingWalkwayItem item={item} index={index}/>
   ) : <FeedItem item={item} index={index}/>
   
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


});
