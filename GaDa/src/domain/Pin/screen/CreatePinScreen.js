import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WritingFrame from '../../../components/WritingFrame';

const CreatePinScreen = ({ pinImage }) => {
  return (
    <WritingFrame
      titlePlaceHolder="제목"
      contentPlaceholder="내용"
      buttonTitle="작성완료"
      image={pinImage}
    />
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({});
