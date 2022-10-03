import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { PinSample1 } from '../../../constant/images/PinSample';
import { blackColor, borderColor, mainColor } from '../../../constant/colors';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import Text from '../../../components/MyText';
import CommentList from '../components/CommentList';
const DetailPinScreen = () => {
  return (
    <ScrollView bounce={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topWrapper}>
            <View style={styles.pinWrapper}>
              <Text style={styles.pin}>핀2</Text>
            </View>
            <Text style={styles.date}>2022.07.30 작성</Text>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>여기 장애물 없어졌어요</Text>
            <Text style={styles.content}>
              방문할때 확인 바랍니다. 이번에 재개발 어쩌구 한다고 완전
              깨끗해졌네요 ㅋㅋ
            </Text>
            <CustomImage style={styles.image} source={PinSample1} />
          </View>
        </View>
        <CommentList />
      </View>
    </ScrollView>
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
  },
  image: {
    width: '100%',
    height: 173,
  },
});
