import {
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CenterModal from '../../../components/CenterModal';
import PinInformation from '../components/PinInformation';
import WebView from 'react-native-webview';
import CustomImage from '../../../components/CustomImage';
import CurrentPosition from '../../../constant/images/CurrentPosition';
import NewPinButton from '../../../components/NewPinButton';
import PinPosSubmitButton from '../components/PinPosSubmitButton';
import { mediumFontFamily } from '../../../constant/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Pin from '../../../constant/images/Pin';
import { bottomShadowStyle } from '../../../constant/styles';
import { useNavigation } from '@react-navigation/core';
import { getWalkwayList } from '../../../APIs/walkway';
import WalkwayListComponent from '../components/WalkwayListComponent';
import WalkwayOverview from '../components/WalkwayOverview';
import SubmitButton from '../../../components/SubmitButton';
import Stop from '../../../constant/images/Stop';
import { useSelector } from 'react-redux';
import WalkEnd from '../../../components/WalkEnd';
import PinListModal from '../../../components/PinListModal';
import { getDistanceFromLatLonInKm } from '../../../function';
import Text from '../../../components/MyText';

const HomeScreen = ({
  geoLocation,
  handleConnection,
  selectedItem,
  closeModal,
  handleClickItem,
  isVisible,
  isInformationVisible,
  closeInformation,
  handleClickWalkway,
  startWalk,
  listIsVisible,
  stopWalk,
  endModalVisible,
  closeEndModal,
  openEndModal,
  walkEnd,
  resetData,
  walkData,
  pinNum,
  setNowPath,
  setStartPoint,
  nowPath,
  nowPins,
  setNowPins,
  setIsWalkwayFocused,
  startModalVisible,
  openStartModal,
  closeStartModal,
}) => {
  const ref = useRef();
  const [markerPos, setMarkerPos] = useState({
    lat: 0,
    lng: 0,
  });
  const [currentPos, setCurrentPos] = useState({});
  const [submitPosPinIsVisible, setSubmitPinPosIsVisible] = useState();
  const [walkwayList, setWalkwayList] = useState([]);
  const [pinIndex, setPinIndex] = useState(0);
  const [pinModalIsVisible, setPinModalIsVisible] = useState(false);
  const [checkPin, setCheckPin] = useState(-1);
  const navigation = useNavigation();
  const { isWalking } = useSelector(state => state.status);
  const [checkFirst, setCheckFirst] = useState(true);
  const closePinModal = () => {
    setPinModalIsVisible(false);
  };
  const INJECTED_JAVASCRIPT = `(function() {
    window.postMessage(JSON.stringify({key : "value"}));true;
})();`;

  // const handleRecordPosition = async recordPosition => {
  //   // await send
  //   console.log(recordPosition);
  // };
  const handleReceive = event => {
    const {
      nativeEvent: { data },
    } = event;

    if (data !== 'undefined') {
      const msg = JSON.parse(data);
      if (msg.type === 'currentPos') setCurrentPos(msg.position);
      if (msg.type === 'pinPos') setMarkerPos(msg.position);
      if (msg.type === 'clickPin') {
        setPinIndex(msg.index);
        setCheckPin(checkPin * -1);
      }
      // if (msg.type === 'read') console.log({ position: msg.position });
      // if (msg.type === 'recordPosition') {
      //   handleRecordPosition(recordPosition);
      // }
    }
  };

  const getWalkway = async currentPos => {
    const res = await getWalkwayList(currentPos);
    const { walkways = [] } = res ? res : {};
    setWalkwayList(walkways);
  };
  useEffect(() => {
    if (markerPos.lat !== 0 && markerPos.lng !== 0) {
      console.log(markerPos.lat, markerPos.lng);
      navigation.navigate('CreatePin', {
        selectedItem: selectedItem,
        markerPos,
      });
    }
  }, [markerPos]);

  useEffect(() => {
    if (pinIndex !== -1 && !checkFirst) setPinModalIsVisible(true);
    setCheckFirst(false);
  }, [pinIndex, checkPin]);

  useEffect(() => {
    handleConnection(ref, 'selectWalkway');
  }, [nowPins]);

  useEffect(() => {
    if (currentPos.lat !== 0 && currentPos.lng !== 0) {
      getWalkway(currentPos);
    }
  }, [currentPos]);
  useEffect(() => {
    if (isWalking) {
      handleConnection(ref, 'startWalk');
    } else {
      handleConnection(ref, 'stopWalk');
    }
  }, [isWalking]);

  // console.log(
  //   getDistanceFromLatLonInKm({
  //     lat1: 37.52326084981643,
  //     lng1: 126.9829734115683,
  //     lat2: 37.52319545411705,
  //     lng2: 126.9829625459926,
  //   }),
  // );
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <WebView
        // source={{ uri: 'https://ga-da-goldenolive.vercel.app' }}
        source={{ uri: 'https://4bc6-110-8-134-126.jp.ngrok.io' }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        ref={ref}
        javaScriptEnabled
        onMessage={handleReceive}
      />
      {/* <NewPinButton handleConnection={handleConnection} ref={ref} /> */}
      {isWalking && (
        <TouchableWithoutFeedback
          onPress={() => {
            handleConnection(ref, 'addPin');
            setSubmitPinPosIsVisible(true);
          }}
        >
          <View style={styles.addPinContainer}>
            <View style={styles.addPinWrapper}>
              <LinearGradient
                colors={['rgb(64,209,126)', 'rgb(130,251,181)']}
                style={styles.linear}
              />
              <CustomImage source={Pin} style={styles.addPinIcon} />
              <Text style={styles.addPinText}>추가</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      {submitPosPinIsVisible && (
        <TouchableWithoutFeedback
          onPress={() => {
            handleConnection(ref, 'submitPinPos');
            setSubmitPinPosIsVisible(false);
          }}
        >
          <View style={styles.submitPinPosWrapper}>
            <Text style={styles.submitPinPosText}>확인</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {isWalking && (
        <TouchableWithoutFeedback
          onPress={() => handleConnection(ref, 'currentPos')}
        >
          <View style={styles.currentPosIconWrapper}>
            <CustomImage
              style={styles.currentPosIcon}
              source={CurrentPosition}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <WalkwayListComponent
        list={walkwayList}
        selectedItem={selectedItem}
        closeModal={closeModal}
        handleClickItem={handleClickItem}
        isVisible={listIsVisible}
        setNowPath={setNowPath}
        setStartPoint={setStartPoint}
        setNowPins={setNowPins}
        setIsWalkwayFocused={setIsWalkwayFocused}
        nowPath={nowPath}
      />
      <WalkwayOverview
        walkWay={selectedItem}
        isVisible={isVisible}
        closeModal={closeModal}
        handleOverview={handleClickWalkway}
      />
      <PinInformation
        walkWay={selectedItem}
        closeModal={closeInformation}
        isVisible={isInformationVisible}
        startWalk={openStartModal}
      />
      {isWalking && (
        <SubmitButton
          text="중지"
          version={2}
          image={Stop}
          handlePress={openEndModal}
        />
      )}
      <CenterModal
        isVisible={endModalVisible}
        closeModal={closeEndModal}
        handleConfirm={stopWalk}
        mainText="산책을 중지하시겠어요?"
        content={`산책을 멈춥니다!\n해당 산책로는 이후 다시\n진행할 수 있습니다.`}
        buttonText="산책 종료"
      />
      <CenterModal
        isVisible={startModalVisible}
        closeModal={closeStartModal}
        handleConfirm={startWalk}
      />
      {walkEnd && (
        <WalkEnd
          isVisible={walkEnd}
          onPress={resetData}
          walkData={walkData}
          pinNum={pinNum}
        />
      )}
      <PinListModal
        dataList={nowPins}
        isVisible={pinModalIsVisible}
        closeModal={closePinModal}
        selectedIndex={pinIndex}
        address={selectedItem.address}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentPosIconWrapper: {
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 24,
    right: 18,
    borderRadius: 50,
  },
  currentPosIcon: {
    width: 32,
    height: 32,
  },
  currentPosIconText: {
    color: 'black',
  },

  addPinContainer: {
    flex: 1,
    position: 'absolute',
    right: 18,
    bottom: 110,
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.14,
  },
  addPinWrapper: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linear: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
  },
  addPinIcon: {
    width: 32,
    height: 32,
    zIndex: 999,
  },
  addPinText: {
    fontFamily: mediumFontFamily,
    fontSize: 11,
    letterSpacing: -0.22,
    color: 'white',
  },
  submitPinPosWrapper: {
    position: 'absolute',
    top: 61,
    right: 16,
    //zIndex: 100,

    paddingVertical: 7,
    paddingHorizontal: 23,
    borderRadius: 17,

    backgroundColor: '#49d492',

    ...bottomShadowStyle,
    zIndex: 999,
  },
  submitPinPosText: {
    fontFamily: mediumFontFamily,
    fontSize: 16,
    color: 'white',
  },
});
