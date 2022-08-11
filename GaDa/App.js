import React, { useEffect, useRef } from 'react';
import { PermissionsAndroid, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // permission 관리
  useEffect(() => {
    if (Platform.OS === 'android') {
      console.log('hey');
      requestCameraPermission();
    }
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 접근 권한 허용',
          message: 'StyleRecipe가 카메라 접근 권한을 요청합니다.',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaProvider>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          routeNameRef.current = currentRouteName;
        }}
      >
        {/* <SafeAreaView style={{ flex: 1 }} edges={['bottom']}> */}
        <RootNavigation />
        {/* </SafeAreaView> */}
        {/*<Toast ref={ref => Toast.setRef(ref)} /> */}
      </NavigationContainer>
      {/* <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f0257365c07b494e7d10e2420948411b&libraries=services,clusterer&autoload=false"
        strategy="beforeInteractive"
      /> */}
    </SafeAreaProvider>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AppWrapper;
