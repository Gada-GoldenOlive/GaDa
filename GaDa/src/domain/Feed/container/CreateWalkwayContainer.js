import React from 'react';
import { useState } from 'react';
import CreateWalkwayScreen from '../screen/CreateWalkwayScreen';

const CreateWalkwayContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { item = {} } = params;

  const [walkwayTitle, setTitle] = useState(item.title);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(0);

  const titleTextChange = text => {
    setTitle(text);
  };
  const contentTextChange = text => {
    setContent(text);
  };

  return (
    <CreateWalkwayScreen
      item={item}
      walkwayTitle={walkwayTitle}
      content={content}
      rate={rate}
      setRate={setRate}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
    />
  );
};

export default CreateWalkwayContainer;
