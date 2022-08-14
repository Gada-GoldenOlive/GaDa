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
import { bottomShadowStyle } from '../../../constant/styles';
import { useNavigation } from '@react-navigation/core';

const HomeScreen = ({ geoLocation, handleConnection }) => {
  const ref = useRef();
  const [markerPos, setMarkerPos] = useState({
    lat: 0,
    lng: 0,
  });
  const [submitPosPinIsVisible, setSubmitPinPosIsVisible] = useState();

  const navigation = useNavigation();

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

  const runFirst = `
      window.isNativeApp = true;
      true;
    `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://53fb-110-8-134-126.jp.ngrok.io' }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        ref={ref}
        javaScriptEnabled
        onMessage={handleReceive}
      />
      {/* <NewPinButton handleConnection={handleConnection} ref={ref} /> */}

      <TouchableWithoutFeedback
        onPress={() => {
          handleConnection(ref, 'addPin');
          setSubmitPinPosIsVisible(true);
        }}
      >
        <View style={styles.addPinContainer}>
          <View style={styles.addPinWrapper}>
            <LinearGradient
              colors={['rgb(64,209,126)', 'rgb(130,251,181)']}
              style={styles.linear}
            />
            <CustomImage source={Pin} style={styles.addPinIcon} />
            <Text style={styles.addPinText}>추가</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {submitPosPinIsVisible && (
        <TouchableWithoutFeedback
          onPress={() => {
            handleConnection(ref, 'submitPinPos');
            setSubmitPinPosIsVisible(false);
            navigation.navigate('CreatePin');
          }}
        >
          <View style={styles.submitPinPosWrapper}>
            <Text style={styles.submitPinPosText}>확인</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback onPress={() => geoLocation(ref)}>
        <View style={styles.currentPosIconWrapper}>
          <CustomImage style={styles.currentPosIcon} source={CurrentPosition} />
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

  addPinContainer: {
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
  addPinWrapper: {
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
  addPinIcon: {
    width: 32,
    height: 32,
    zIndex: 999,
  },
  addPinText: {
    fontFamily: mediumFontFamily,
    fontSize: 11,
    letterSpacing: -0.22,
    color: 'white',
  },
  submitPinPosWrapper: {
    position: 'absolute',
    top: 61,
    right: 16,
    //zIndex: 100,

    paddingVertical: 7,
    paddingHorizontal: 23,
    borderRadius: 17,

    backgroundColor: '#49d492',

    ...bottomShadowStyle,
  },
  submitPinPosText: {
    fontFamily: mediumFontFamily,
    fontSize: 16,
    color: 'white',
  },
});
