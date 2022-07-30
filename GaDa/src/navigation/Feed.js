import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import FeedContainer from '../domain/Feed/container/FeedContainer';


const Stack = createStackNavigator();
const feedScreen = {
  Feed: FeedContainer
}

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: true,
        cardStyle: {backgroundColor: 'white'},
        headerTitleStyle: {
          fontFamily: boldFontFamily,
          fontSize: boldFontSize,
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
      }}>
      {Object.entries({ ...feedScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '피드',
          }}
        />
      ))}
      </Stack.Navigator>
  );
};

export default FeedNavigator;
