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
  clickable,
}) => {
  return (
    <WritingFrame
      titlePlaceHolder="핀 제목"
      contentPlaceholder="불편사항이나 특이사항을 설명해주세요"
      buttonTitle="작성완료"
      image={pinImage}
      title={pinTitle}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      handlePress={handlePress}
      // address={address}
      setImage={setImage}
      badges={badges}
      type={type}
      clickable={clickable}
    />
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({});
