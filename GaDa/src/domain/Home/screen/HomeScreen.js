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
import { mediumFontFamily } from '../../../constant/fonts';
import LinearGradient from 'react-native-linear-gradient';
import Pin from '../../../constant/images/Pin';

const HomeScreen = ({ geoLocation, handleConnection }) => {
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
      {/* <NewPinButton handleConnection={handleConnection} ref={ref} /> */}
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => handleConnection(ref, 'addPin')}
        >
          <View style={styles.wrapper}>
            <LinearGradient
              colors={['rgb(64,209,126)', 'rgb(130,251,181)']}
              style={styles.linear}
            />
            <CustomImage source={Pin} style={styles.image} />
            <Text style={styles.text}>추가</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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

  container: {
    flex: 1,
    position: 'absolute',
    right: 18,
    bottom: 110,
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.14,
  },
  wrapper: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linear: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
  },
  image: {
    width: 32,
    height: 32,
    zIndex: 999,
  },
  text: {
    fontFamily: mediumFontFamily,
    fontSize: 11,
    letterSpacing: -0.22,
    color: 'white',
  },
});
