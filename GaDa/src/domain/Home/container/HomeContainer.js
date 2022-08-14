import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';
import { useDispatch } from 'react-redux';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';
import { getCurrentTime } from '../../../function';
import { setStartTime } from '../../../redux/modules/status';

// * 현재위치
// 일정 시간 후 주기적으로 반복해서 geoLocation 해주기!
// 가능하면 거리 계산해서 일정 거리 이상 이동했을 때만 전송하도록 하기
//

const CURRENTPOS = 'currentPos';

const HomeContainer = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLogitude] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [listIsVisible, setListIsVisible] = useState(true);

  const dispatch = useDispatch();

  const geoLocation = ref => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        console.log(latitude, longitude);
        setLatitude(latitude);
        setLogitude(longitude);
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
    />
  );
};

export default HomeContainer;
