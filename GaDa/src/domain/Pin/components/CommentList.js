import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from '../../../components/MyText';
import { boldFontFamily } from '../../../constant/fonts';
import { borderColorVer2 } from '../../../constant/colors';

const ListFooterComponent = () => {
    return <View style={{height: 50}}/>
}
const CommentList = () => {
  const commentList = [
    { user: 'Summer', content: '여기 다시 막혔어요!' },
    { user: 'Summer', content: '여기 다시 막혔어요!' },
    { user: 'Summer', content: '여기 다시 막혔어요!' },
    { user: 'Summer', content: '여기 다시 막혔어요!' },
  ];
  
  const renderItem = ({ item, index }) => {
    const { user, content } = item;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{user}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: borderColorVer2,
    borderBottomWidth: 1,
  },
  name: {
    fontFamily: boldFontFamily,
    fontSize: 13,
    marginBottom: 12,
  },
  content: {
    lineHeight: 20,
  },
});
