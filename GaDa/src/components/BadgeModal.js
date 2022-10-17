import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CenterModal from './CenterModal';
import { useState } from 'react';
import CustomImage from './CustomImage';
import CloseIcon from '../constant/images/Close';
import CustomButton from './CustomButton';
import Text from './MyText';
import { blackColor, buttonColor, mainColor } from '../constant/colors';
import { boldFontFamily, boldFontSize } from '../constant/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setBadges } from '../redux/modules/status';

const BadgeModal = ({ data }) => {
  const {badge} = data;
  const { title, image } = badge;
  const {badges} = useSelector(state => state.status);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const closeModal = () => {
    setVisible(false);
    badges.pop();
    console.log(badges);
    
  };
  const renderMainBody = () => {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <CustomImage source={CloseIcon} style={styles.close} />
        </TouchableWithoutFeedback>
        <View style={styles.center}>
          <CustomImage style={styles.image} source={{ uri: image }} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.button}>
            <Text style={styles.text}>확인</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  return (
    <CenterModal
      isVisible={visible}
      closeModal={closeModal}
      handleConfirm={closeModal}
      renderMainBody={renderMainBody}
      buttonText="확인"
    />
  );
};

export default BadgeModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 0,
    end: 0,
  },
  center: {
    paddingTop: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 18,
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    lineHeight: 31,
    color: blackColor,
    fontFamily: boldFontFamily,
  },
  button: {
    paddingTop: 13,
    paddingBottom: 14,
    width: '100%',
    backgroundColor: buttonColor,
    alignItems: 'center',
    borderRadius: 9,
  },
  text: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
});
