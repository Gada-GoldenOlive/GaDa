import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import HomeContainer from '../domain/Home/container/HomeContainer';

const Stack = createStackNavigator();
const homeScreen = {
  Home: HomeContainer,
};
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: '#eaeaea',
          borderBottomWidth: 0.5,
        },
        unmountOnBlur: true,
        title: {},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
      }}
    >
      {Object.entries({ ...homeScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '홈',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
