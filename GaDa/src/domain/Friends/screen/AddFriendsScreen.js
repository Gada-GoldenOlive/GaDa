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
import { boldFontFamily } from '../../../constant/fonts';
import Text from '../../../components/MyText';
import { useEffect } from 'react';
import Modal from 'react-native-modal';

import CloseIcon, { Close } from '../../../constant/images/Close';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddFriendsScreen = ({ searchList, handleAddConfirmButton }) => {
  const ref = useRef();
  const [searchId, setSearchId] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addUser, setAddUser] = useState({ id: -1, name: '' });

  console.log(searchId);
  console.log(searchList);

  const openPopup = () => {
    setIsPopupVisible(true);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAddButton = (id, name) => {
    setIsPopupVisible(!isPopupVisible);
    setAddUser({ id, name });
  };
  // useEffect(() => {
  //   if (isPopupVisible) {
  //   }
  // }, [isPopupVisible]);

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
            onPress={() => handleAddButton(item.id, item.name)}
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
      {/* {isPopupVisible && ( */}
      <Modal
        style={styles.popUpContainer}
        isVisible={isPopupVisible}
        hasBackDrop
        onBackdropPress={closePopup}
        deviceHeight={windowHeight}
        deviceWidth={windowWidth}
        backdropColor={'black'}
        backdropOpacity={0.5}
      >
        <View style={styles.popUpWrapper}>
          <View style={styles.popUpTitleWrapper}>
            <View>
              <Text style={styles.popUpTitle}>{addUser.name}님에게</Text>
              <Text style={styles.popUpTitle}>친구추가 신청을 보냅니다</Text>
            </View>
            {/* <View> */}
            <TouchableWithoutFeedback onPress={closePopup}>
              <CustomImage
                source={CloseIcon}
                style={{ width: 24, height: 24 }}
                tintColor="black"
              />
            </TouchableWithoutFeedback>
            {/* </View> */}
          </View>
          <View style={styles.popUpTextWrapper}>
            <Text style={styles.popUpText}>{addUser.name}님의 산책정보를</Text>
            <Text style={styles.popUpText}>확인할 수 있어요</Text>
          </View>
          <TouchableWithoutFeedback onPress={handleAddConfirmButton}>
            <View style={styles.popUpConfirmButtonWrapper}>
              <Text style={styles.popUpConfirmButtonText}>친구 신청하기</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* </View> */}
      </Modal>
      {/* )} */}

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
  popUpBackground: {
    opacity: 0.5,
    position: 'absolute',
    // zIndex: 2000,
    top: 0,
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  popUpContainer: {
    // position: 'absolute',
    // zIndex: 2000,

    // width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpWrapper: {
    width: windowWidth - 41 * 2,

    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 18,

    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 15,
  },
  popUpTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  popUpTitle: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    lineHeight: 31,
    letterSpacing: -0.4,
    color: 'black',
  },
  closeIcon: {},
  popUpTextWrapper: {
    marginTop: 10,
  },
  popUpText: {
    color: '#8d8d8d',
    lineHeight: 20,
    letterSpacing: -0.28,
  },
  popUpConfirmButtonWrapper: {
    marginTop: 60,
    backgroundColor: '#49d492',
    // paddingHorizontal: 81,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  popUpConfirmButtonText: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    lineHeight: 31,
    letterSpacing: -0.32,
    color: 'white',
  },
});
