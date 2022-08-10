import { View, Text } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import HomeScreen from '../screen/HomeScreen';

const HomeContainer = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <WebView
        source={{ uri: 'https://a830-221-146-182-190.jp.ngrok.io' }}
        //injectedJavaScript={runFirst}
      /> */}
      <HomeScreen />
    </View>
  );
};

export default HomeContainer;
