import React from 'react';
import ModifyPWScreen from '../screen/ModifyPWScreen';
import { useState } from 'react';
import { getPWIsNotValid } from '../../../function';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyPw } from '../../../APIs/user';
import { setPW } from '../../../redux/modules/user';

const ModifyPWContainer = ({ navigation, route }) => {
  const { userId } = useSelector(state => state.user);

  const [current, setCurrent] = useState('');
  const [newText, setNewText] = useState('');
  const [check, setCheck] = useState('');

  const [currentWrong, setCurrentWrong] = useState(false);
  const [newWrong, setNewWrong] = useState(false);
  const [checkWrong, setCheckWrong] = useState(false);
  const [clickable, setClickable] = useState(false);

  const dispatch = useDispatch();

  const currentChange = text => {
    setCurrent(text);
    setCurrentWrong(false);
  };
  const newChange = text => {
    setNewText(text);
  };
  const checkChange = text => {
    setCheck(text);
  };

  const handleCurrentValid = () => {};

  const handleCheckValid = () => {
    console.log(check, newText)
    if (check === newText) {
      setCheckWrong(false);
    } else {
      setCheckWrong(true);
    }
  };

  const handleNewValid = () => {
    const res = getPWIsNotValid({ pw: newText });
    if (res) {
      setNewWrong(true);
    } else {
      setNewWrong(false);
    }
  };

  const changePW = async () => {
    const data = {
      "originPassword": current,
      "password": newText,
    }
    const res = await modifyPw(userId, data);
    console.log(res);
    if(res){
      if(res === 400){
        setCurrentWrong(true);
      } else  {
        setCurrentWrong(false);
        dispatch(setPW(newText));
        navigation.goBack();
      }
    }
  };
  useEffect(() => {
    handleCheckValid();
  }, [check]);
  useEffect(() => {
    handleNewValid();
  }, [newText]);

  useEffect(() => {
    handleCurrentValid();
  }, [current]);

  useEffect(() => {
    if(current !== '' && !currentWrong && !newWrong && !checkWrong) {
      setClickable(true);
    }else {
      setClickable(false);
    }
  }, [currentWrong, newWrong, checkWrong]);

  return (
    <ModifyPWScreen
      current={current}
      newText={newText}
      check={check}
      currentChange={currentChange}
      newChange={newChange}
      checkChange={checkChange}
      changePW={changePW}
      currentWrong={currentWrong}
      newWrong={newWrong}
      checkWrong={checkWrong}
      clickable={clickable}
    />
  );
};

export default ModifyPWContainer;
