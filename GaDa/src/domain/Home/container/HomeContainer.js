import { View, Text } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const HomeContainer = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        //source={{ uri: 'https://a830-221-146-182-190.jp.ngrok.io' }}
        source={{ uri: 'https://4e45-110-8-134-126.jp.ngrok.io' }}
        //injectedJavaScript={runFirst}
      />
    </View>
  );
};

export default HomeContainer;
