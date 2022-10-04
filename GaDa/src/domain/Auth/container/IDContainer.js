import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import IDScreen from '../screen/IDScreen';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../../redux/modules/user';
import { getUsersCheckedId } from '../../../APIs/user';

const IDContainer = ({ navigation }) => {
  const [isWrong, setIsWrong] = useState(true);
  const { userId } = useSelector(state => state.user);
  const [first, setFirst] = useState(true);
  const [changed, setChanged] = useState(false)

  const dispatch = useDispatch();
  const handleIdChange = idText => {
    dispatch(setUserId(idText));
    setChanged(true)
  };
  const handleNavigate = () => {
    if (!isWrong) {
      navigation.navigate('PW');
    }
  };

  const checkId = async () => {
    const res = await getUsersCheckedId(userId);
    console.log(res);
    const { isValid } = res;
    if (isValid) {
      setIsWrong(false);
    } else if(!isValid){
      setIsWrong(true)
    }
    setChanged(false)
    setFirst(false);
  };
  useEffect(() => {
    dispatch(setUserId(''));
  }, []);

  return (
    <IDScreen
      isWrong={isWrong}
      userId={userId}
      first={first}
      checkId={checkId}
      changed={changed}
      handleNavigate={handleNavigate}
      handleIdChange={handleIdChange}
    />
  );
};

export default IDContainer;
