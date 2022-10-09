import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import IDScreen from '../screen/IDScreen';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginId, setUserId } from '../../../redux/modules/user';
import { getUsersCheckedId } from '../../../APIs/user';
import { getIDIsNotValid } from '../../../function';

const IDContainer = ({ navigation }) => {
  const [isWrong, setIsWrong] = useState(true);
  const { loginId } = useSelector(state => state.user);
  const [first, setFirst] = useState(true);
  const [changed, setChanged] = useState(false);
  const [isNotValid, setIsNotValid] = useState(true);

  const dispatch = useDispatch();
  const handleIdChange = idText => {
    dispatch(setLoginId(idText));
    if(getIDIsNotValid(idText)){
      setIsNotValid(true);
    }else {
      setIsNotValid(false);
    }
    setChanged(true);
  };
  const handleNavigate = () => {
    if (!isWrong) {
      navigation.navigate('PW');
    }
  };

  const checkId = async () => {
    const res = await getUsersCheckedId(loginId);
    const { isValid } = res;
    if (isValid) {
      setIsWrong(false);
    } else if (!isValid) {
      setIsWrong(true);
    }
    setChanged(false);
    setFirst(false);
  };
  useEffect(() => {
    dispatch(setLoginId(''));
  }, []);

  return (
    <IDScreen
      isWrong={isWrong}
      isNotValid={isNotValid}
      loginId={loginId}
      first={first}
      checkId={checkId}
      changed={changed}
      handleNavigate={handleNavigate}
      handleIdChange={handleIdChange}
    />
  );
};

export default IDContainer;
