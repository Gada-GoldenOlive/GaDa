import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const HomeContainer = () => {
  return (
    <View style={{flex:1}}>
      <WebView
        source={{uri:'https://www.naver.com/'}}
        //injectedJavaScript={runFirst}
      />
    </View>
  );
};

export default HomeContainer;
