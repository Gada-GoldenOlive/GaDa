import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WritingFrame from '../../../components/WritingFrame';

const CreateWalkwayScreen = ({
  title = '어쩌구저쩌구',
  content = '내용입니다',
  titleTextChange,
  contentTextChange,
  address = '서대문구 서대문로',
}) => {
  return (
    <WritingFrame
      titlePlaceHolder="제목"
      contentPlaceholder="내용"
      buttonTitle="업로드"
      title={title}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      address={address}
      type="walkway"
    />
  );
};

export default CreateWalkwayScreen;

const styles = StyleSheet.create({});
