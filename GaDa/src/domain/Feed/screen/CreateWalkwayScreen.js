import { StyleSheet } from 'react-native';
import React from 'react';
import WritingFrame from '../../../components/WritingFrame';

const CreateWalkwayScreen = ({
  walkwayTitle = '',
  content = '',
  titleTextChange,
  contentTextChange,
  item,
  rate,
  setRate,
}) => {
  const {createdAt, distance, finishStatus, id, image,pinCount, time, title, walkwayId} = item;
  
  return (
    <WritingFrame
      titlePlaceHolder="제목"
      contentPlaceholder="내용"
      buttonTitle="업로드"
      title={walkwayTitle}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      address={title}
      type="walkway"
      rate={rate}
      setRate={setRate}

    />
  );
};

export default CreateWalkwayScreen;

const styles = StyleSheet.create({});
