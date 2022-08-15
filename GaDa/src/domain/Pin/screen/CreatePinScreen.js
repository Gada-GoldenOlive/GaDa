import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WritingFrame from '../../../components/WritingFrame';

const CreatePinScreen = ({
  pinImage,
  title,
  content,
  titleTextChange,
  contentTextChange,
  createPinInfo,
  address,
}) => {
  return (
    <WritingFrame
      titlePlaceHolder="제목"
      contentPlaceholder="내용"
      buttonTitle="작성완료"
      image={pinImage}
      title={title}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      createPinInfo={createPinInfo}
      address={address}
    />
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({});
