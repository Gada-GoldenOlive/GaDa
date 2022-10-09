import React, {
  useEffect,
  useRef,
  useState,
  BackHandler,
  useCallback,
} from 'react';
import { PermissionsAndroid, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NetInfo from '@react-native-community/netinfo';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
// SplashScreen 추가
import SplashScreen from 'react-native-splash-screen';
import { setIsAuthenticated, setUserId } from './src/redux/modules/user';
import { storeInLocalStorage } from './src/function';
import { refreshToken, verifyToken } from './src/APIs/JWT';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultAxios from './src/APIs';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);

  // permission 관리
  useEffect(() => {
    if (Platform.OS === 'android') {
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
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.warn('Error Occured');
      console.warn(e);
    }
  });

  // Access Token 관리
  useEffect(() => {
    loadEssentialData();
  }, [loadEssentialData]);

  const getNetworkState = useCallback(async () => {
    const state = await NetInfo.fetch();
    return state;
  }, []);

  const getTokens = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    return { access_token, refresh_token };
  };

  const loadEssentialData = async () => {
    const state = await getNetworkState();
    if (state.isConnected !== true) {
      Alert.alert('네트워크 확인', '네트워크를 연결하고 다시 시도해주세요.', [
        {
          text: '확인',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return null;
    }

    const { access_token = '', refresh_token = '' } = await getTokens();
    if (access_token) {
      defaultAxios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      const { new_access_token = '', new_refresh_token = '' } =
        await refreshToken(access_token);
      if (new_access_token && new_refresh_token) {
        console.log('hey')
        const { sub: user_id } = jwtDecode(new_access_token);
        dispatch(setUserId(user_id));
        dispatch(setIsAuthenticated(true));
        defaultAxios.defaults.headers.common.Authorization = `Bearer ${new_access_token}`;
        await storeInLocalStorage(new_access_token, new_refresh_token);
      }
    } else {
      setLoading(false);
      console.log('error')

    }
    SplashScreen.hide();
  }; // getNetworkState

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
