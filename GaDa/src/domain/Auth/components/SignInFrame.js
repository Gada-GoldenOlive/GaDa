import {
  NativeModules,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import MyTextInPut from '../../../components/MyTextInput';
import {
  blackColor,
  buttonColor,
  descriptionColor,
  descriptionColorVer2,
} from '../../../constant/colors';
import CustomButton from '../../../components/CustomButton';
import Text from '../../../components/MyText';
import { thinFontFamily } from '../../../constant/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { useEffect } from 'react';
import { windowHeight, windowWidth } from '../../../constant/styles';
const SignInFrame = props => {
    const {
      screenContainerStyle = {},
      mainText = '',
      emphasisText = '',
      subText = '',
      mainTextContainerStyle = {},
      renderMainTextComponent = null,
      mainTextStyle = {},
      mainBodyContainerStyle = {},
      renderMainBody = () => <View />, // main body customized component
      renderFooter = () => <CustomButton />,
      footerContainerStyle = {},
    } = props;
  
    const { StatusBarManager } = NativeModules;
    const [statusBarHeight, setStatusBarHeight] = useState(0);
  
    useEffect(() => {
      Platform.OS === 'ios' &&
        StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        });
    }, []);
  
    const renderMainText = () => {
 
      return (
        <>
          <Text style={[styles.title, mainTextStyle]}>
            <Text style={[styles.title, mainTextStyle]}>{firstString}</Text>
              {emphasisText}
            </Text>
            <Text style={[styles.title, mainTextStyle]}>{secondString}</Text>
          {subText !== '' && <Text style={styles.description}>{subText}</Text>}
        </>
      );
    };
    const headerComponent = () => {
      return (
        <View style={[styles.mainTextContainer, mainTextContainerStyle]}>
          {renderMainTextComponent ? renderMainTextComponent() : renderMainText()}
        </View>
      );
    };
    const renderMainComponent = () => {
      return (
        <View style={[styles.mainBodyContainer, mainBodyContainerStyle]}>
          {renderMainBody()}
        </View>
      );
    };
    const renderFooterComponent = () => {
      return (
        <View style={[styles.footerContainer, footerContainerStyle]}>
          {renderFooter()}
        </View>
      );
    };
  //const back = !changed && !isWrong ? buttonColor : descriptionColor;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      keyboardVerticalOffset={statusBarHeight + 44}
      behavior={Platform.OS === 'ios' && 'padding'}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        bounces={false}
        scrollEnabled
        enableOnAndroid
        enableAutomaticScroll
        keyboardShouldPersistTaps="always"
        extraScrollHeight={Platform.OS === 'android' ? 250 : -100}
      >
        <View style={[styles.screenContainer, screenContainerStyle]}>
          {(mainText.length !== 0 || renderMainTextComponent) &&
            headerComponent()}
          {renderMainComponent()}
        </View>
        
      </KeyboardAwareScrollView>
      
      {renderFooter && renderFooterComponent()}
      {/* <Background /> */}
    </KeyboardAvoidingView>
  );
};

export default SignInFrame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: '100%',
  },
  title: {
    fontSize: 27,
    lineHeight: 40,
    color: blackColor,
    fontFamily: thinFontFamily,
    paddingHorizontal: 16,
  },
  description: {
    paddingHorizontal: 16,
    color: descriptionColorVer2,
  },
  contentContainer: {
    paddingTop: 130,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomColor: descriptionColorVer2,
  },
  buttonWrapper: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: blackColor,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  errorText: {
    marginTop: 9.5,
    color: 'rgb(255,92,0)',
  },
  button: {
    //flex:1,
  },
});
