import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import CreatePinScreen from '../screen/CreatePinScreen';
import { useDispatch, useSelector } from 'react-redux';
import { createPin } from '../../../APIs/pin';
import { setPinNum } from '../../../redux/modules/status';
import { refreshImages } from '../../../redux/modules/images';

const CreatePinContainer = ({ navigation, route }) => {
  const { params } = route;
  const { selectedItem, markerPos } = params;
  const { address, title = '', id } = selectedItem;
  const { lat, lng } = markerPos;
  const { pinImage } = useSelector(state => state.images);
  const [pinTitle, setPinTitle] = useState(title);
  const [content, setContent] = useState('');
  const { pinNum } = useSelector(state => state.status);

  const dispatch = useDispatch();
  const createPinInfo = async () => {
    const pinData = {
      title: title,
      content: content,
      image: `${pinImage}`,
      location: {
        lat: lat,
        lng: lng,
      },
      walkwayId: id,
      userId: '2af75a44-f64d-44bf-8b9a-86b911f8d8ec',
    };

    const res = await createPin(pinData);
    console.log(res);
    dispatch(setPinNum(pinNum + 1));

    navigation.pop();
  };

  const titleTextChange = value => {
    setPinTitle(value);
  };
  const contentTextChange = value => {
    setContent(value);
  };

  useEffect(() => {
    dispatch(refreshImages());
  }, []);

  return (
    <CreatePinScreen
      pinImage={pinImage}
      title={pinTitle}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      createPinInfo={createPinInfo}
      address={address}
    />
  );
};

export default CreatePinContainer;
