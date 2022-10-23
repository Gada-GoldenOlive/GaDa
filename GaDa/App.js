import React, {
  useEffect,
  useRef,
  useState,
  BackHandler,
  useCallback,
} from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import RNRestart from 'react-native-restart';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NetInfo, { refresh } from '@react-native-community/netinfo';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
// SplashScreen 추가
import SplashScreen from 'react-native-splash-screen';
import { setIsAuthenticated, setUserId } from './src/redux/modules/user';
import {
  removeInLocalStorage,
  setIdInLocalStorage,
  storeInLocalStorage,
} from './src/function';
import { refreshToken, verifyToken } from './src/APIs/JWT';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultAxios from './src/APIs';
import { reloadApp } from './src/function/error';
import {
  boldFontFamily,
  defaultFontFamily,
  mediumFontFamily,
  thinFontFamily,
} from './src/constant/fonts';
import {
  defaultColor,
  descriptionColorVer2,
  mainColor,
} from './src/constant/colors';
import Text from './src/components/MyText';
import axios from 'axios';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);

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
      requestLocationAccuracy();
      requestCameraPermission();
    }
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 접근 권한 허용',
          message: 'GaDa가 카메라 접근 권한을 요청합니다.',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
        // RNRestart.Restart();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestLocationAccuracy = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 접근 권한 허용',
          message: 'GaDa가 위치 접근 권한을 요청합니다.',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
        //RNRestart.Restart();
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
    setLoading(true);
    const { access_token = '', refresh_token = '' } = await getTokens();

    if (access_token) {
      const { isValid: isAccessTokenValid } = await verifyToken(access_token);
      console.log({ isAccessTokenValid });
      if (isAccessTokenValid) {
        const { new_access_token = '', new_refresh_token = '' } =
          await refreshToken(refresh_token);
        if (new_access_token) {
          const { sub: user_Id } = jwtDecode(new_access_token);
          console.log({ user_Id });
          dispatch(setUserId(user_Id));
          dispatch(setIsAuthenticated(true));

          axios.defaults.headers.common.Authorization = `Bearer ${new_access_token}`;
          await storeInLocalStorage(new_access_token, new_refresh_token);
        } else {
          removeInLocalStorage();
        }
      } else {
        const { isValid: isRefreshTokenValid } = await verifyToken(
          refresh_token,
        );
        console.log({ isRefreshTokenValid });
        if (isRefreshTokenValid) {
          const { new_access_token = '', new_refresh_token = '' } =
            await refreshToken(refresh_token);
          console.log({ new_access_token, new_refresh_token });
          if (new_access_token && new_refresh_token) {
            const { sub: user_id } = jwtDecode(new_access_token);
            dispatch(setUserId(user_id));
            dispatch(setIsAuthenticated(true));
            axios.defaults.headers.common.Authorization = `Bearer ${new_access_token}`;
            await storeInLocalStorage(new_access_token, new_refresh_token);
          } else {
            removeInLocalStorage();
          }
        }
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
    SplashScreen.hide();
  }; // getNetworkState

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: mainColor }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text2Style={{
          fontSize: 12,
          fontFamily: thinFontFamily,
          color: 'black',
        }}
      />
    ),
    error: props => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15, marginTop: 5 }}
        text2Style={{
          fontSize: 8,
          fontFamily: defaultFontFamily,
          color: defaultColor,
        }}
      />
    ),
  };

  return (
    <SafeAreaProvider>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      {!loading && (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;

            routeNameRef.current = currentRouteName;
          }}
        >
          {/* <SafeAreaView style={{ flex: 1 }} edges={['bottom']}> */}
          <StatusBar backgroundColor="white" barStyle={'dark-content'} />
          <RootNavigation />

          {/* </SafeAreaView> */}

          <Toast
            ref={ref => Toast.setRef(ref)}
            position="top"
            config={toastConfig}
          />
        </NavigationContainer>
      )}
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
  text1: {
    fontFamily: defaultFontFamily,
    fontSize: 16,
  },
});

export default AppWrapper;
