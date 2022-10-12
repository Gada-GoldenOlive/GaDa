import { StyleSheet, View } from 'react-native';
import React from 'react';
import FeedItemList from '../../Feed/components/FeedItemList';
import Text from '../../../components/MyText';

const LikeReviewsScreen = ({ reviewList, handleDetailFeed }) => {
  return reviewList.length > 0 ?(
    <View style={styles.container}>
      <FeedItemList
        handleDetailFeed={handleDetailFeed}
        feedList={reviewList}
        type="feed"
      />
    </View>
  ) : (
    <View style={styles.nullContainer}>
    <Text style={styles.nullTitle}>좋아요한 게시글이 없습니다</Text>
  </View>
  )
};

export default LikeReviewsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  nullContainer:{
    paddingTop: 24,
    alignItems: 'center'

  }
});
