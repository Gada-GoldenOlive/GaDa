import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CenterModal from '../../../components/CenterModal';
import BottomUpModal from '../../../components/BottomUpModal';
import PinInformation from '../components/PinInformation';

const HomeScreen = ({ isVisible, closeModal, openModal }) => {
  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={openModal}>
          {/* <Text>HomeScreen</Text> */}
        </TouchableWithoutFeedback>
        {/*<BottomUpModal mainText={`젠오님의 산책을\n기록할게요`} subText = {`동선기록을 시작합니다.\n즐거운 산책경험을 만드세요!`} isVisible={isVisible} closeModal={closeModal} />*/}
        {isVisible && (
          <PinInformation
            mainText={`젠오님의 산책을\n기록할게요`}
            subText={`동선기록을 시작합니다.\n즐거운 산책경험을 만드세요!`}
            isVisible={isVisible}
            closeModal={closeModal}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
