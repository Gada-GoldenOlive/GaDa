import {
  FlatList,
  RefreshControl,
  StyleSheet,
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
  clickItem,
  selectedItem, 
  refreshing,
  onRefresh,
  handleLoadMore,
}) => {

  const renderItem = ({ item, index }) => {

    return type === 'recent' ? (
      <GettingWalkwayItem item={item} index={index} clickItem={clickItem} selectedItem={selectedItem} />
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
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
