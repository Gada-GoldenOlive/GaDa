import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { PinSample1 } from '../../../constant/images/PinSample';
import Setting from '../../../constant/images/Setting';
import { blackColor, descriptionColor, descriptionColorVer2 } from '../../../constant/colors';
import { boldFontFamily } from '../../../constant/fonts';
const Profile = ({handleNavigateSetting}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomImage source={PinSample1} style={styles.image} />
        <View style={styles.infoContainer}>
        <Text style={styles.name}>산책왕 뽀삐</Text>
        <Text style={styles.num}>초대번호: 123456</Text>
        </View>
        <TouchableWithoutFeedback onPress={handleNavigateSetting}>
          <CustomImage style={styles.setting} source={Setting} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 36,
    paddingVertical: 15,
    paddingStart: 14,
    paddingEnd: 28.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 100,
    width: 42,
    height: 42,
    marginRight: 13,
  },
  infoContainer:{
    flex: 1,
  },
  name: {
    color: blackColor,
    fontSize: 18,
    fontFamily: boldFontFamily,
    flex: 1,
  },
  num:{
    marginTop: 1,
    color: descriptionColorVer2,
    fontSize: 12
  },
  setting: {
    width: 19,
    height: 20,
  },
});
