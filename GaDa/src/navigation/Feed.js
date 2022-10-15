import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import FeedBookmark from '../components/FeedBookmark';
import Text from '../components/MyText';
import { boldFontFamily } from '../constant/fonts';
import FeedContainer from '../domain/Feed/container/FeedContainer';

const Stack = createStackNavigator();
const feedScreen = {
  Feed: FeedContainer,
};

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: boldFontFamily,
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
      {Object.entries({ ...feedScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '',
            headerLeft : () => <Text style={{marginStart: 10}}>Instagram</Text> ,
            headerRight: () => <FeedBookmark />
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default FeedNavigator;
