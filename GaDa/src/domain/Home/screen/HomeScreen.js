import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { KakaoMapView } from '@jiggag/react-native-kakao-maps';
import WebView from 'react-native-webview';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>이거 나오냐구구우우우</Text>
      {/* <WebView
        source={{uri:'http://localhost:3000'}}
        injectedJavaScript={runFirst}
      /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
