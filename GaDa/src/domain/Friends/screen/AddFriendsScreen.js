import {
  Dimensions,
  FlatList,
  Platform,
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
import { boldFontFamily, defaultFontFamily } from '../../../constant/fonts';
import Text from '../../../components/MyText';
import { useEffect } from 'react';
import Modal from 'react-native-modal';

import CloseIcon, { Close } from '../../../constant/images/Close';
import PopupModal from '../../../components/PopupModal';
import BadgeModal from '../../../components/BadgeModal';

const AddFriendsScreen = ({
  searchList,
  handleAddConfirmButton,
  handleCheckConfirmButton,
  handleSearchButton,
  handleAddButton,
  closePopup,
  closeCheckPopup,
  isPopupVisible,
  isCheckPopupVisible,
  addUser,
  searchId,
  setSearchId,
  badges,
  isSearch,
}) => {
  const ref = useRef();

  // useEffect(() => {
  //   if (isPopupVisible) {
  //   }
  // }, [isPopupVisible]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.flexDirection}>
          <View style={styles.flexDirection}>
            <CustomImage style={styles.userImg} source={{ uri: item.image }} />
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userId}>{item.loginId}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => handleAddButton(item.loginId, item.name)}
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
    <>
      <PopupModal
        isPopupVisible={isCheckPopupVisible}
        closePopup={closeCheckPopup}
        handleConfirmButton={handleCheckConfirmButton}
        content={{
          title: `친구추가 신청이\n완료되었습니다`,
          description: ``,
          button: '확인',
        }}
      />
      <PopupModal
        isPopupVisible={isPopupVisible}
        closePopup={closePopup}
        handleConfirmButton={handleAddConfirmButton}
        content={{
          title: `${addUser.name}님에게\n친구추가 신청을 보냅니다`,
          description: `${addUser.name}님의 산책정보를\n확인할 수 있어요`,
          button: '친구 신청하기',
        }}
      />

      <View style={styles.container}>
        <View style={styles.searchInput}>
          <TextInput
            textAlignVertical="top"
            placeholder="아이디를 입력하세요"
            placeholderTextColor={descriptionColor}
            onChangeText={setSearchId}
            value={searchId}
            style={{
              fontFamily: defaultFontFamily,
              flex: 1,
              alignItems: 'center',
              color: '#535353',
            }}
            ref={ref}
          />
          <TouchableWithoutFeedback
            onPress={() => handleSearchButton(searchId)}
          >
            <CustomImage source={Search} style={styles.searchIcon} />
          </TouchableWithoutFeedback>
        </View>
        {isSearch && searchList.length === 0 ? (
          <View style={styles.nullContainer}>
            <Text>검색 목록이 없습니다</Text>
          </View>
        ) : (
          <FlatList
            data={searchList}
            renderItem={(item, index) => renderItem(item, index)}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
        {badges.length > 0 &&
          badges.map((item, index) => {
            const { badge } = item;
            const { image } = badge;
            return <BadgeModal data={item} key={image} />;
          })}
      </View>
    </>
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
    paddingVertical: Platform.OS === 'ios' ? 16 : 8,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 50,
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
  nullContainer: {
    paddingTop: 24,
    alignItems: 'center',
  },
});
