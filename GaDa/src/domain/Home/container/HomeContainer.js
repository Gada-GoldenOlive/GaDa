import { View, Text, TouchableWithoutFeedback, LogBox } from 'react-native';
import React, { useRef, useState } from 'react';
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBottomTabVisible,
  setCurrentPosition,
  setEndTime,
  setIsWalking,
  setPinNum,
} from '../../../redux/modules/status';
import { useEffect } from 'react';
import { getCurrentTime, getDuringTime } from '../../../function';
import { setStartTime } from '../../../redux/modules/status';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { createWalk } from '../../../APIs/walk';

// * 현재위치
// 일정 시간 후 주기적으로 반복해서 geoLocation 해주기!
// 가능하면 거리 계산해서 일정 거리 이상 이동했을 때만 전송하도록 하기
//

const CURRENTPOS = 'currentPos';

const HomeContainer = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // 현재위치
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  // 내위치 리스트
  const [locationList, setLocationList] = useState([]);
  // 기록 시작
  const [recording, setRecording] = useState(false);
  // 이전 기록
  const [beforeRecord, setBeforeRecord] = useState(null);
  // overview visible
  const [isVisible, setIsVisible] = useState(false);
  // 현재 선택된 산책로
  const [selectedItem, setSelectedItem] = useState({});
  // 자세한 정보 visible
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  // 산책로 리스트 component visible
  const [listIsVisible, setListIsVisible] = useState(true);
  // 끝내겠습니까? 모달 visible
  const [endModalVisible, setEndModalVisible] = useState(false);
  // 산책 종료 모달 visible
  const [walkEnd, setWalkEnd] = useState(false);
  // walk data
  const [walkData, setWalkData] = useState({});
  // 생성한 핀 개수
  const { pinNum } = useSelector(state => state.status);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const geoLocation = ref => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        console.log(latitude, longitude);
        setLatitude(latitude);
        setLongitude(longitude);
        handleConnection(ref, CURRENTPOS); // 웹에 현재 위치 보내기
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  };

  const recordPosition = () => {
    const newId = Geolocation.watchPosition(
      position => {
        if (position) {
          let updateFlag = true;
          const newRecord = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // 시작
          if (beforeRecord !== null) {
            // console.log(beforeRecord, newRecord);
            const dist = getDistance(beforeRecord, newRecord, 0.1);
            if (dist < 50) {
              updateFlag = false;
            }
          }
          if (updateFlag) {
            setCoords(newRecord);
            setBeforeRecord(newRecord);
            setLocationList(locationList => [...locationList, newRecord]);
            dispatch(setCurrentPosition(newRecord));
          }
        }
      },
      err => {
        console.log(err.message);
      },
      { enableHighAccuracy: false },
    );

    setRecording(true);
  };

  const handleConnection = (ref, ver) => {
    const path = [
      { lat: 37.5351787566412, lng: 126.90313420225422 },
      { lat: 37.5367288255216, lng: 126.90442351809145 },
      { lat: 37.53686544779613, lng: 126.904258307496 },

      { lat: 37.53710837379388, lng: 126.90417148286825 },
      { lat: 37.53732658502673, lng: 126.9040990030548 },

      { lat: 37.53738716655828, lng: 126.90404758556996 },
      { lat: 37.53745509339161, lng: 126.90411212912906 },
      { lat: 37.53746494883995, lng: 126.90427900574636 },
      { lat: 37.537608987470044, lng: 126.90424390281818 },
      { lat: 37.537703211212765, lng: 126.90416109026054 },
      { lat: 37.53775902917459, lng: 126.90405877483371 },
      { lat: 37.53779011809602, lng: 126.90396797513036 },
    ];
    const generateOnMessageFunction = data =>
      `(function() {
    window.dispatchEvent(new MessageEvent('message', {data: ${JSON.stringify(
      data,
    )}}));
  })()`;

    ref.current.injectJavaScript(
      generateOnMessageFunction({ type: ver, path: path }),
    );
  };

  const closeModal = () => {
    setIsVisible(false);
    setListIsVisible(true);
  };

  const handleClickItem = item => {
    setIsVisible(true);
    setListIsVisible(false);
    setSelectedItem(item);
  };

  const closeInformation = () => {
    setIsInformationVisible(false);
  };
  const handleClickWalkway = () => {
    setIsInformationVisible(true);
    closeModal();
  };

  const startWalk = () => {
    const res = getCurrentTime();
    dispatch(setStartTime(res));
    setIsVisible(false);
    setListIsVisible(false);
    setIsInformationVisible(false);
    setRecording(true);
    dispatch(setIsWalking(true));
  };

  const stopWalk = () => {
    endWalk('UNFINISHED');
    closeEndModal();
  };

  const openEndModal = () => {
    setEndModalVisible(true);
  };
  const closeEndModal = () => {
    setEndModalVisible(false);
    setIsVisible(false);
  };

  const finishRecord = () => {
    setRecording(false);
    return getDistance(
      locationList[0],
      locationList[locationList.length - 1],
      0.1,
    );
  };

  const endWalk = async status => {
    const res = getCurrentTime();
    dispatch(setEndTime(res));
    dispatch(setIsWalking(false));
    const time = getDuringTime();
    const dis = finishRecord();

    const nowWalk = {
      time: time,
      distance: dis,
      finishStatus: status,
      walkwayId: selectedItem.id,
      userId: '1',
    };
    setWalkData(nowWalk);
    const res2 = await createWalk(nowWalk);
    setWalkEnd(true);
  };

  const resetData = () => {
    setLocationList([]);
    setCoords({ latitude: null, longitude: null });
    setRecording(false);
    setBeforeRecord(null);
    setIsVisible(false);
    setSelectedItem({});
    setIsInformationVisible(false);
    setListIsVisible(true);
    setEndModalVisible(false);
    setWalkEnd(false);
    setWalkData({});
    dispatch(setPinNum(0));
    dispatch(setIsWalking(false));
  };
  useEffect(() => {
    // walkEnd일때 안보여야하고 information visible일때 안보여야한다
    const tabVisible = !walkEnd && !isInformationVisible;

    dispatch(setBottomTabVisible(tabVisible));
  }, [walkEnd, isInformationVisible]);

  useEffect(() => {
    if (recording && !loading) {
      recordPosition();
    }
  }, [recording]);

  useEffect(() => {
    resetData();
  }, []);
  return (
    <HomeScreen
      geoLocation={geoLocation}
      handleConnection={handleConnection}
      isVisible={isVisible}
      selectedItem={selectedItem}
      closeModal={closeModal}
      handleClickItem={handleClickItem}
      isInformationVisible={isInformationVisible}
      closeInformation={closeInformation}
      handleClickWalkway={handleClickWalkway}
      startWalk={startWalk}
      listIsVisible={listIsVisible}
      stopWalk={stopWalk}
      endModalVisible={endModalVisible}
      closeEndModal={closeEndModal}
      openEndModal={openEndModal}
      walkEnd={walkEnd}
      resetData={resetData}
      walkData={walkData}
      pinNum={pinNum}
    />
  );
};

export default HomeContainer;
