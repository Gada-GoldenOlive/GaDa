import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CenterModal from '../../../components/CenterModal';
import BottomUpModal from '../../../components/BottomUpModal';
import PinInformation from '../components/PinInformation';
import WebView from 'react-native-webview';
import CustomImage from '../../../components/CustomImage';
import CurrentPosition from '../../../constant/images/CurrentPosition';
import NewPinButton from '../../../components/NewPinButton';
import PinPosSubmitButton from '../components/PinPosSubmitButton';

const HomeScreen = ({ geoLocation }) => {
  const ref = useRef();
  const [markerPos, setMarkerPos] = useState({
    lat: 0,
    lng: 0,
  });

  const INJECTED_JAVASCRIPT = `(function() {
    window.postMessage(JSON.stringify({key : "value"}));true;
})();`;

  const handleReceive = event => {
    const {
      nativeEvent: { data },
    } = event;

    if (data !== 'undefined') {
      //console.log(typeof data);
      var latStartIdx = data.indexOf(':') + 1;
      var latEndIdx = data.indexOf(',');
      var lat = Number(data.slice(latStartIdx, latEndIdx));

      var lngStartIdx = data.indexOf('g') + 3;
      var lngEndIdx = data.indexOf('}');
      var lng = Number(data.slice(lngStartIdx, lngEndIdx));

      setMarkerPos({ lat: lat, lng: lng });
    }
  };
  useEffect(() => {
    if (markerPos.lat !== 0 && markerPos.lng !== 0) {
      console.log(markerPos.lat, markerPos.lng);
    }

    //Alert.alert(markerPos.lat);
  }, [markerPos]);
  //JSON.stringify({ type: 'currentposition', data: 'hi' }),
  const runFirst = `
      window.isNativeApp = true;
      true;
    `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://53fb-110-8-134-126.jp.ngrok.io' }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        //injectJavaScript
        ref={ref}
        javaScriptEnabled
        onMessage={handleReceive}
        //onLoad={geoLocation(ref)}
        //postMessage={geoLocation(ref)}
      />
      <NewPinButton />
      <PinPosSubmitButton />
      <TouchableWithoutFeedback onPress={() => geoLocation(ref)}>
        <View style={styles.currentPosIconWrapper}>
          <CustomImage style={styles.currentPosIcon} source={CurrentPosition} />
          {/* <Text style={styles.currentPosIconText}>위치</Text> */}
        </View>
      </TouchableWithoutFeedback>
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
});
