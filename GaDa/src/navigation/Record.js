import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import BackButton from '../components/BackButton';
import GoalSettingContainer from '../domain/Record/container/GoalSettingContainer';
import RecordContainer from '../domain/Record/container/RecordContainer';

const Stack = createStackNavigator();
const recordScreen = {
  Record: RecordContainer,
};
const goalSettingScreen = {
  GoalSetting: GoalSettingContainer,
};
const RecordNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{
        headerShown: true,
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
      {Object.entries({ ...recordScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '기록',
          }}
        />
      ))}
      {Object.entries({ ...goalSettingScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerLeft: () => <BackButton />,
            title: '달성목표 설정',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RecordNavigator;
