import { View, Text } from 'react-native';
import React from 'react';
import SettingPageScreen from '../screen/SettingPageScreen';

const SettingPageContainer = ({ navigation }) => {
    const handleNaigateNickname = () => {
        navigation.navigate('ModifyNickname');
      };
  return <SettingPageScreen handleNaigateNickname={handleNaigateNickname}/>;
};

export default SettingPageContainer;
