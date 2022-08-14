import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';
import { useDispatch } from 'react-redux';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';

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
    const generateOnMessageFunction = data =>
      `(function() {
    window.dispatchEvent(new MessageEvent('message', {data: ${JSON.stringify(
      data,
    )}}));
  })()`;

    ref.current.injectJavaScript(generateOnMessageFunction(ver));
  };

  const closeModal = () => {
    setIsVisible(false);
  };
  const handleClickItem = item => {
    setIsVisible(true);
    setSelectedItem(item);
  };

  const closeInformation = () => {
    setIsInformationVisible(false);
  };
  const handleClickWalkway = () => {
    setIsInformationVisible(true);
    setIsVisible(false);
    // dispatch(setBottomTabVisible(isInformationVisible));
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
    />
  );
};

export default HomeContainer;
