import React, { useEffect } from 'react';
import IDScreen from '../screen/IDScreen';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginId, setUserId } from '../../../redux/modules/user';
import { getUsersCheckedId } from '../../../APIs/user';
import { getIDIsNotValid } from '../../../function';
import SignInFrame from '../components/SignInFrame';

const IDContainer = ({ navigation }) => {
  const [isWrong, setIsWrong] = useState(true);
  const [id, setId] = useState('');
  const [first, setFirst] = useState(true);
  const [changed, setChanged] = useState(false);
  const [isNotValid, setIsNotValid] = useState(true);

  const dispatch = useDispatch();
  const handleIdChange = idText => {
    setId(idText);
    if (getIDIsNotValid(idText)) {
      setIsNotValid(true);
    } else {
      setIsNotValid(false);
    }
    setChanged(true);
  };
  const handleNavigate = () => {
    if (!isWrong) {
      dispatch(setLoginId(id));
      navigation.navigate('PW');
    }
  };

  const checkId = async () => {
    const res = await getUsersCheckedId(id);
    console.log(res, id);
    if (res) {
      const { isValid } = res;
      setIsWrong(!isValid);
    }
    setChanged(false);
    setFirst(false);
  };
  useEffect(() => {
    dispatch(setLoginId(''));
  }, []);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <IDScreen
      isWrong={isWrong}
      isNotValid={isNotValid}
      loginId={id}
      first={first}
      checkId={checkId}
      changed={changed}
      handleNavigate={handleNavigate}
      handleIdChange={handleIdChange}
    />
  );
};

export default IDContainer;
