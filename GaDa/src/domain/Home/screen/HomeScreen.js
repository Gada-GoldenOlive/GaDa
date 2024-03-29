import {
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CenterModal from '../../../components/CenterModal';
import PinInformation from '../components/PinInformation';
import WebView from 'react-native-webview';
import CustomImage from '../../../components/CustomImage';
import CurrentPosition from '../../../constant/images/CurrentPosition';
import NewPinButton from '../../../components/NewPinButton';
import PinPosSubmitButton from '../components/PinPosSubmitButton';
import { boldFontFamily, mediumFontFamily } from '../../../constant/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Pin from '../../../constant/images/Pin';
import { bottomShadowStyle, windowWidth } from '../../../constant/styles';
import { useNavigation } from '@react-navigation/core';
import { getWalkwayInfo, getWalkwayList } from '../../../APIs/walkway';
import WalkwayListComponent from '../components/WalkwayListComponent';
import WalkwayOverview from '../components/WalkwayOverview';
import SubmitButton from '../../../components/SubmitButton';
import Stop from '../../../constant/images/Stop';
import { useDispatch, useSelector } from 'react-redux';
import WalkEnd from '../../../components/WalkEnd';
import PinListModal from '../../../components/PinListModal';
import { getDistanceFromLatLonInKm } from '../../../function';
import Text from '../../../components/MyText';
import { setCurrentPosition } from '../../../redux/modules/status';
import BadgeModal from '../../../components/BadgeModal';
import { descriptionColor } from '../../../constant/colors';
import CloseIcon from '../../../constant/images/Close';
import CreateWalkwayButton from '../components/CreateWalkwayButton';
import { SearchThisPos } from '../../../constant/images/Map';

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
  setIsVisible,
  setListIsVisible,
  setSelectedItem,
  setCurrentPos,
  currentPos,
  endShareModalVisible,
  openEndShareModal,
  closeEndShareModal,
  handleNavigateCreate,
  handleShareButton,
  badges,
  locationList,
}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [markerPos, setMarkerPos] = useState({
    lat: 0,
    lng: 0,
  });

  const [submitPosPinIsVisible, setSubmitPinPosIsVisible] = useState();
  const [walkwayList, setWalkwayList] = useState([]);
  const [pinIndex, setPinIndex] = useState(0);
  const [pinModalIsVisible, setPinModalIsVisible] = useState(false);
  const [checkPin, setCheckPin] = useState(-1);
  const navigation = useNavigation();
  const { isWalking } = useSelector(state => state.status);
  const [isCurrentPosClicked, setIsCurrentPosClicked] = useState(false);
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

  const { isRestart, restartWalkway, currentPosition, isCreate } = useSelector(
    state => state.status,
  );
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    console.log({ locationList });

    if (isCreate) {
      handleConnection(ref, 'locationList');
    }

    if (locationList.length === 0) {
      handleConnection(ref, 'selectWalkway');
    }
  }, [locationList]);

  const handleRestart = async () => {
    const res = await getWalkwayInfo({
      id: restartWalkway.walkwayId,
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    });

    setIsVisible(true);
    setListIsVisible(false);
    setSelectedItem(res?.walkway);
  };
  useEffect(() => {
    if (isRestart) {
      handleRestart();
    }
  }, [isRestart]);
  useEffect(() => {
    if (isRestart && Object.keys(selectedItem).length > 0) {
      console.log('restart');
      handleConnection(ref, 'restartWalkway');
    }
  }, [selectedItem]);
  const handleReceive = event => {
    const {
      nativeEvent: { data },
    } = event;

    if (data !== 'undefined') {
      const msg = JSON.parse(data);
      if (msg.type === 'currentPos') {
        if (isRestart) {
          setCurrentPos(selectedItem.startPoint); // currentPos를 바꿔서 지도 focus 바꿀 수 있음 (화면 전환시)
        } else {
          setCurrentPos(msg.position);
        }
        dispatch(setCurrentPosition(msg.position));
        handleConnection(ref, 'done');
      }
      if (msg.type === 'pinPos') setMarkerPos(msg.position);
      if (msg.type === 'clickPin') {
        setPinIndex(msg.index);
        setCheckPin(checkPin * -1);
      }
      if (msg.type === 'read') console.log({ position: msg.position });
      if (msg.type === 'searchThisPos') {
        setCurrentPos(msg.position);
      }
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
    if (!isCurrentPosClicked) {
      handleConnection(ref, 'selectWalkway');
    } else {
      setIsCurrentPosClicked(false);
    }
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

  useEffect(() => {
    if (Platform.OS === 'android' && isRestart) {
      ref.current.reload();
    }
  }, [selectedItem]);
  useEffect(() => {
    ref.current.reload();
    geoLocation(ref);
  }, []);

  const url = 'https://ga-da-goldenolive.vercel.app';

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <WebView
        source={{ uri: url }}
        // source={{ uri: 'https://bddf-211-202-112-159.jp.ngrok.io' }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        ref={ref}
        javaScriptEnabled
        onMessage={handleReceive}
        onContentProcessDidTerminate={() => {
          ref.current?.reload();
        }}
        geolocationEnabled={true}
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
          onPress={() => {
            // handleConnection(ref, 'currentPos');
            geoLocation(ref);
            setIsCurrentPosClicked(true);
          }}
        >
          <View style={styles.currentPosIconWrapper}>
            <CustomImage
              style={styles.currentPosIcon}
              source={CurrentPosition}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {!isWalking && (
        <TouchableWithoutFeedback
          onPress={() => {
            // handleConnection(ref, 'currentPos');
            geoLocation(ref);
            setIsCurrentPosClicked(true);
          }}
        >
          <View style={styles.currentPosSmallIconWrapper}>
            <CustomImage
              style={styles.currentPosSmallIcon}
              source={CurrentPosition}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {!isWalking && (
        <TouchableWithoutFeedback
          onPress={() => {
            handleConnection(ref, 'searchThisPos');
            // console.log('click');
          }}
        >
          <View style={styles.searchThisPosIconWrapper}>
            <CustomImage
              style={styles.searchThisPosIcon}
              source={SearchThisPos}
            />
          </View>
        </TouchableWithoutFeedback>
      )}

      {walkwayList.length > 0 ? (
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
          openStartModal={openStartModal} // 산책로 제작을 위해
        />
      ) : (
        <View
          style={{
            backgroundColor: 'rgba(149, 149, 149, 0.9)',
            marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 32,
            paddingVertical: 36,
            width: windowWidth - 32,
            borderRadius: 9,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: mediumFontFamily,
              fontSize: 16,
              lineHeight: 22,
              letterSpacing: -0.32,
              textAlign: 'center',
            }}
          >{`해당 지역에 산책로가 없습니다\n다른 지역으로 검색해 주세요`}</Text>
        </View>
      )}
      {!isWalking && !walkEnd && isAuthenticated && (
        <CreateWalkwayButton openStartModal={openStartModal} />
      )}
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
          // onPress={resetData}
          onPress={isCreate ? handleNavigateCreate : resetData}
          walkData={walkData}
          pinNum={pinNum}
        />
      )}
      <CenterModal
        isVisible={endShareModalVisible}
        closeModal={closeEndShareModal}
        handleConfirm={handleShareButton} // 공유하기
        secondHandleConfirm={resetData}
        // renderMainBody={shareModalBody}
        mainText="산책을 공유하시겠어요?"
        content={`공유한 산책로는 피드 및 지도에\n등록되며, 다른 사용자들이 이 산책로를\n체험할 수 있습니다.`}
        buttonText="공유하기"
        secondButtonText="아니요"
      />
      <PinListModal
        dataList={nowPins}
        isVisible={pinModalIsVisible}
        closeModal={closePinModal}
        selectedIndex={pinIndex}
        address={selectedItem.address}
        handleRestart={handleRestart}
      />
      {badges.length > 0 &&
        badges.map((item, index) => {
          const { badge } = item;
          const { image } = badge;
          return <BadgeModal data={item} key={image} />;
        })}
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

  currentPosSmallIconWrapper: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 220,
    right: 18,
    borderRadius: 50,

    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4,
  },
  currentPosSmallIcon: {
    width: 22.71,
    height: 22.71,
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
  modalWrapper: {
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 18,
    borderRadius: 15,
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    color: 'black',
    lineHeight: 31,
  },
  close: {
    width: 24,
    height: 24,
  },
  middleContainer: {
    marginTop: 10,
    marginBottom: 60,
  },
  content: {
    lineHeight: 20,
    color: descriptionColor,
  },
  button: {
    position: 'relative',
    width: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
  },
  searchThisPosIconWrapper: {
    position: 'absolute',
    top: 61,
    right: windowWidth / 2 - 70,
  },
  searchThisPosIcon: {
    width: 140,
    height: 50,
  },
});
