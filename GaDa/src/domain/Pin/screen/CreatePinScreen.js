import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WritingFrame from '../../../components/WritingFrame';

const CreatePinScreen = ({
  pinImage,
  title,
  content,
  titleTextChange,
  contentTextChange,
  handlePress,
  address,
  setImage,
  pinTitle,
  badges,
  type,
}) => {
  return (
    <WritingFrame
      titlePlaceHolder="제목"
      contentPlaceholder="내용"
      buttonTitle="작성완료"
      image={pinImage}
      title={pinTitle}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      handlePress={handlePress}
      address={address}
      setImage={setImage}
      badges={badges}
      type={type}
    />
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({});
