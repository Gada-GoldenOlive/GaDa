import {
  FlatList,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Text from '../../../components/MyText';
import { boldFontFamily } from '../../../constant/fonts';
import {
  borderColorVer2,
  descriptionColorVer2,
} from '../../../constant/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getDate } from '../../../function';

const ListFooterComponent = ({}) => {
  return <View style={{ height: 100 }} />;
};
const CommentList = ({ headerComponent, pinComments, handleLoadMore }) => {
  const renderItem = ({ item, index }) => {
    const { id, content, creator, creatorId, createdAt, updatedAt } = item;
    return (
      <View style={styles.itemContainer} key={id}>
        <View style={styles.topWrapper}>
          <Text style={styles.name}>{creator}</Text>
          <Text style={styles.date}>{getDate(createdAt)}</Text>
        </View>
        <Text style={styles.content}>{content}</Text>
      </View>
    );
  };
  return pinComments.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        data={pinComments}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={headerComponent}
      />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      {headerComponent()}
      <View style={styles.nullContainer}>
        <Text style={styles.nullTitle}>핀에 댓글이 없습니다</Text>
      </View>
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    marginHorizontal: 16,
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
  nullContainer: {
    paddingTop: 24,
    alignItems: 'center',
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: descriptionColorVer2,
  },
});
