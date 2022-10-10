import React from 'react';
import ModifyPWScreen from '../screen/ModifyPWScreen';
import { useState } from 'react';
import { getPWIsNotValid } from '../../../function';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ModifyPWContainer = ({ navigation, route }) => {
  
  const [current, setCurrent] = useState('');
  const [newText, setNewText] = useState('');
  const [check, setCheck] = useState('');

const [currentWrong, setCurrentWrong] = useState(false);
const [newWrong, setNewWrong] = useState(false);
const [checkWrong, setCheckWrong] = useState(false)

  const currentChange = text => {
    setCurrent(text);
  };
  const newChange = text => {
    setNewText(text);
  };
  const checkChange = text => {
    setCheck(text);
  };

  const handleCurrentValid = () => {
    
  }
  const handleCheckValid = () => {
    if(check === newText){
      setCheckWrong(false)
    }else {
      setCheckWrong(true)
    }
  };

  const handleNewValid = () => {
    const res = getPWIsNotValid({pw: newText})
    if(res){
      setNewWrong(true);
    }else {
      setNewWrong(false)
    }
  };
  useEffect(() => {
    handleCheckValid()
  }, [check])
  useEffect(() => {
    handleNewValid()
  }, [newText])

  useEffect(() => {
    handleCurrentValid();
  }, [current])

  return (
    <ModifyPWScreen
      current={current}
      newText={newText}
      check={check}
      currentChange={currentChange}
      newChange={newChange}
      checkChange={checkChange}
      currentWrong={currentWrong}
      newWrong={newWrong}
      checkWrong={checkWrong}
    />
  );
};

export default ModifyPWContainer;
