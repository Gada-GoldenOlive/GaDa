import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  NativeModules,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomImage from '../../../components/CustomImage';
import { UploadArrow } from '../../../constant/images/Arrow';
import { blackColor, borderColor, mainColor } from '../../../constant/colors';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import Text from '../../../components/MyText';
import CommentList from '../components/CommentList';
import { getDate } from '../../../function';
import { thumbnail3 } from '../../../constant/images/Sample';
import MyTextInput from '../../../components/MyTextInput';
import { windowWidth } from '../../../constant/styles';

import moment from 'moment';
import BadgeModal from '../../../components/BadgeModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import Writing from '../../../constant/images/Writing';
import Delete from '../../../constant/images/Delete';
const DetailPinScreen = ({
  index,
  pinData,
  pinComments,
  handleLoadMore,
  comment,
  badges,
  commentChange,
  handlePostComment,
  modifyPin,
  handleDeletePin,
}) => {
  const { userId: myId } = useSelector(state => state.user);
  const { id, title, content, image, walkwayId, updatedAt, userId } = pinData;
  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS === 'ios' &&
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
  }, []);
  const headerComponent = () => {
    return (
      <View style={styles.topContainer}>
        <View style={styles.topWrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <View style={styles.pinWrapper}>
              <Text style={styles.pin}>핀{index + 1}</Text>
            </View>
            <Text style={styles.date}>{getDate(updatedAt)} 작성</Text>
          </View>
          {userId === myId && (
            <View style={styles.iconContainer}>
              <TouchableWithoutFeedback
                onPress={() => modifyPin(pinData, index)}
              >
                <CustomImage
                  source={Writing}
                  style={[styles.icon, { marginEnd: 20 }]}
                />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => handleDeletePin(id)}>
                <CustomImage source={Delete} style={styles.icon} />
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          {image !== '' && image !== null ? (
            <CustomImage style={styles.image} source={{ uri: image }} />
          ) : (
            <CustomImage style={styles.image} source={thumbnail3} />
          )}
          <View style={styles.dateWrapper}>
            <Text style={styles.photoDate}>
              {moment(updatedAt).format('YY-MM-DD')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        keyboardVerticalOffset={statusBarHeight + 44}
        behavior={Platform.OS === 'ios' && 'padding'}
      >
        <View style={styles.container}>
          <CommentList
            headerComponent={headerComponent}
            pinComments={pinComments}
            handleLoadMore={handleLoadMore}
          />
          <View style={styles.bottomContainer}>
            <View style={styles.textInputWrapper}>
              <MyTextInput
                placeholder="댓글을 입력하세요"
                style={styles.input}
                onChangeText={commentChange}
                value={comment}
                multiline
                returnKeyType="default"
              />
              <TouchableWithoutFeedback onPress={handlePostComment}>
                <View style={styles.imageWrapper}>
                  <CustomImage source={UploadArrow} style={styles.arrow} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DetailPinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: 'rgb(243,243,243)',
    borderBottomWidth: 8,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinWrapper: {
    backgroundColor: mainColor,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginEnd: 10,
  },
  pin: {
    color: 'white',
    fontSize: 12,
  },
  date: {
    color: mainColor,
    fontSize: 12,
  },
  contentWrapper: {
    marginTop: 16,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: blackColor,
    marginBottom: 3,
  },
  content: {
    lineHeight: 22,
    marginBottom: 9,
  },
  image: {
    width: windowWidth - 32,
    height: 173,
  },
  dateWrapper: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    right: 10,
    bottom: 15,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  photoDate: {
    color: 'white',
    fontSize: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  textInputWrapper: {
    backgroundColor: 'rgba(235,235,245,0.18)',
    borderColor: 'rgba(116,116,128,0.28)',
    borderRadius: 37,
    borderWidth: 1,
    paddingEnd: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 0,
    paddingTop: 11,
    paddingBottom: 9,
    paddingStart: 17,
    fontSize: 14,
    flex: 1,
  },
  imageWrapper: {
    borderRadius: 100,
    padding: 3,
    alignItems: 'center',
    backgroundColor: mainColor,
    marginStart: 5,
  },
  arrow: {
    width: 22,
    height: 22,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
