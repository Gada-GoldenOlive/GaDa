import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';

const HomeContainer = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLogitude] = useState(null);

  const wsTmp = new WebSocket(`wss://4e45-110-8-134-126.jp.ngrok.io:3000/ws`);

  const geoLocation = ref => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        console.log(latitude, longitude);
        setLatitude(latitude);
        setLogitude(longitude);
        handleConnection(ref); // 웹에 현재 위치 보내기
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const handleConnection = ref => {
    //console.log(ref.current.postMessage('hi'));
    //console.log(wsTmp);
    //wsTmp.postMessage('메시지 입니다');
    // ref.current.postMessage('This Message from RN');
    // ref.current.injectJavaScript(
    //   `window.ReactNativeWebView.postMessage(
    //     {
    //       reply: 'reply'
    //     }
    //   );`,
    // );

    const generateOnMessageFunction = data =>
      `(function() {
    window.dispatchEvent(new MessageEvent('message', {data: ${JSON.stringify(
      data,
    )}}));
  })()`;

    ref.current.injectJavaScript(
      generateOnMessageFunction(latitude + ',' + longitude * -1),
    );
  };

  return <HomeScreen geoLocation={geoLocation} />;
};

export default HomeContainer;
