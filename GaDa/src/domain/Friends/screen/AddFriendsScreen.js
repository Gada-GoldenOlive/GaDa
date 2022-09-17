import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { borderColor, descriptionColor } from '../../../constant/colors';
import { useRef } from 'react';
import { useState } from 'react';
import CustomImage from '../../../components/CustomImage';
import { Search } from '../../../constant/images/Friends';
import { boldFontFamily } from '../../../constant/fonts';
import Text from '../../../components/MyText';

const AddFriendsScreen = ({ searchList }) => {
  const ref = useRef();
  const [searchId, setSearchId] = useState();

  console.log(searchId);
  console.log(searchList);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.flexDirection}>
          <View style={styles.flexDirection}>
            <CustomImage style={styles.userImg} source={item.image} />
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userId}>{item.id}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => console.log('추가', item.id)}
          >
            <View style={styles.addButtonWrapper}>
              <Text style={styles.addButtonText}>추가</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <TextInput
          textAlignVertical="top"
          placeholder="아이디를 입력하세요"
          placeholderTextColor={descriptionColor}
          onChangeText={setSearchId}
          value={searchId}
          ref={ref}
        />
        <CustomImage source={Search} style={styles.searchIcon} />
      </View>
      <FlatList
        data={searchList}
        renderItem={(item, index) => renderItem(item, index)}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default AddFriendsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  searchInput: {
    marginTop: 25,
    marginBottom: 15,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  itemContainer: {
    paddingVertical: 20.5,
    borderBottomWidth: 1,
    borderColor: borderColor,
  },
  userName: {
    fontSize: 18,
    fontFamily: boldFontFamily,
    letterSpacing: -0.36,
    color: 'black',
  },
  userId: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: -0.24,
    color: '#929292',
  },
  userImg: {
    width: 42,
    height: 42,
    marginRight: 13,
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButtonWrapper: {
    backgroundColor: '#49d492',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: 'white',
    fontFamily: boldFontFamily,
  },
});
