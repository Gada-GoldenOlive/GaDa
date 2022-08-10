import React, { useRef } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
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
