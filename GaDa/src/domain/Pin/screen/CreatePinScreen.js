import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WritingFrame from '../../../components/WritingFrame';
import { useDispatch, useSelector } from 'react-redux';
const CreatePinScreen = () => {
  const { pinImages } = useSelector(state => state.images);
  const dispatch = useDispatch();
  const setImages = items => {
    dispatch(setPinImages(items));
  };

  return (
    <WritingFrame
      titlePlaceHolder="제목"
      contentPlaceholder="내용"
      buttonTitle="작성완료"
      images={pinImages}
      handleImages={setImages}
    />
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({});
