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
const FeedItemList = ({
  type = 'feed',
  handleDetailFeed,
  headerComponent,

  feedList,
}) => {
  /*
{"address": "서울특별시 용산구 서빙고로", "distance": 9550, "images": [], "like": false, 
"review": {"content": "테스트리뷰3 입니다~~~", "createdAt": "2022-10-08T07:30:42.170Z", "id": "39r918af-0705-d123-f0b9-r0bc742a204dc3", 
  "star": 4, "title": "테스트  리뷰3", "updatedAt": "2022-10-08T07:30:42.170Z", "userId": "42e83ce7-5ba5-4461-91be-119c4f278ff9", 
  "userImage": "https://picsum.photos/150/150/?image=1", "userName": "테스트유저", "vehicle": "MANUAL", "walkwayId": "d2209c34-056f-458f-9bab-ce99e34d2e44", 
  "walkwayTitle": "박물관 보행로 산책로"}, 
"time": 440, "walkwayImage": "https://picsum.photos/400/250/?image=481"}
*/
  const renderItem = ({ item, index }) => {

    return type === 'recent' ? (
      <GettingWalkwayItem item={item} index={index} />
    ) : (
      <FeedItem item={item} index={index} handleDetailFeed={handleDetailFeed} />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        data={feedList}
        bounces={false}
        ListHeaderComponent={headerComponent}
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
