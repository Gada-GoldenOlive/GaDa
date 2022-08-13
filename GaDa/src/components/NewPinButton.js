import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Pin from '../constant/images/Pin';
import CustomImage from './CustomImage';
import Text from './MyText';
import LinearGradient from 'react-native-linear-gradient';
import { MediumFontFamily } from '../constant/fonts';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const NewPinButton = ({ handleConnection, ref }) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('CreatePin');
  };

  useEffect(() => {
    console.log('set');
  }, [ref]);
  console.log(ref);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => console.log('클릭')}>
        <View style={styles.wrapper}>
          <LinearGradient
            colors={['rgb(64,209,126)', 'rgb(130,251,181)']}
            style={styles.linear}
          />
          <CustomImage source={Pin} style={styles.image} />
          <Text style={styles.text}>추가</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NewPinButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 18,
    bottom: 110,
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.14,
  },
  wrapper: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linear: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
  },
  image: {
    width: 32,
    height: 32,
    zIndex: 999,
  },
  text: {
    fontFamily: MediumFontFamily,
    fontSize: 11,
    letterSpacing: -0.22,
    color: 'white',
  },
});
