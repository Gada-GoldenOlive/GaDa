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

      //setMarkerPos({data.slice(6, 25), data.slice(31, -1)});
      //console.log(lat, lng);
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
        source={{uri:'https://53fb-110-8-134-126.jp.ngrok.io'}}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        //injectJavaScript
        ref={ref}
        javaScriptEnabled
        onMessage={handleReceive}
        //onLoad={geoLocation(ref)}
        //postMessage={geoLocation(ref)}
      />
      <TouchableWithoutFeedback onPress={() => geoLocation(ref)}>
        <View style={styles.currentPosIconWrapper}>
          <CustomImage style={styles.currentPosIcon} source={CurrentPosition} />
          {/* <Text style={styles.currentPosIconText}>위치</Text> */}
        </View>
      </TouchableWithoutFeedback>
    </View>
    // <TouchableWithoutFeedback onPress={closeModal}>
    //   <View style={styles.container}>
    //     <TouchableWithoutFeedback onPress={openModal}>
    //       {/* <Text>HomeScreen</Text> */}
    //     </TouchableWithoutFeedback>
    //     {/*<BottomUpModal mainText={`젠오님의 산책을\n기록할게요`} subText = {`동선기록을 시작합니다.\n즐거운 산책경험을 만드세요!`} isVisible={isVisible} closeModal={closeModal} />*/}
    //     {isVisible && (
    //       <PinInformation
    //         mainText={`젠오님의 산책을\n기록할게요`}
    //         subText={`동선기록을 시작합니다.\n즐거운 산책경험을 만드세요!`}
    //         isVisible={isVisible}
    //         closeModal={closeModal}
    //       />
    //     )}
    //   </View>
    // </TouchableWithoutFeedback>
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
