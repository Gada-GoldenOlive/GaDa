import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useState } from 'react';
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';
import { useDispatch } from 'react-redux';
import {
  setBottomTabVisible,
  setEndTime,
  setIsWalking,
} from '../../../redux/modules/status';
import { useEffect } from 'react';
import { getCurrentTime, getDuringTime } from '../../../function';
import { setStartTime } from '../../../redux/modules/status';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

// * 현재위치
// 일정 시간 후 주기적으로 반복해서 geoLocation 해주기!
// 가능하면 거리 계산해서 일정 거리 이상 이동했을 때만 전송하도록 하기
//

const CURRENTPOS = 'currentPos';

const HomeContainer = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [locationList, setLocationList] = useState([]);
  const [recording, setRecording] = useState(true);
  const [beforeRecord, setBeforeRecord] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [listIsVisible, setListIsVisible] = useState(true);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const dispatch = useDispatch();

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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
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

  const stopWalk = async () => {
    const res = getCurrentTime();
    dispatch(setEndTime(res));
    dispatch(setIsWalking(false));
    const time = getDuringTime();
    const dis = finishRecord();
    console.log(time, dis);
    closeEndModal();
  };

  const openEndModal = () => {
    setEndModalVisible(true);
  };
  const closeEndModal = () => {
    setEndModalVisible(false);
  };
  const recordPosition = () => {
    const newId = Geolocation.getCurrentPosition(
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
            const dist = getDistance(beforeRecord, newRecord);
            if (dist < 0.05) {
              updateFlag = false;
            }
          }
          if (updateFlag) {
            setCoords(newRecord);
            setBeforeRecord(newRecord);
            setLocationList(locationList => [...locationList, newRecord]);
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

  const finishRecord = () => {
    setRecording(false);
    return getDistance(locationList[0], locationList[locationList.length - 1]);
  };
  useEffect(() => {
    dispatch(setBottomTabVisible(!isInformationVisible));
  }, [isInformationVisible]);

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
    />
  );
};

export default HomeContainer;
