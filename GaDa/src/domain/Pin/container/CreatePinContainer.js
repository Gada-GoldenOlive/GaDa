import React, { useEffect, useState } from 'react';
import CreatePinScreen from '../screen/CreatePinScreen';
import { useDispatch, useSelector } from 'react-redux';
import { createPin, updatePin } from '../../../APIs/pin';
import { setBadges, setPinNum } from '../../../redux/modules/status';
import {
  refreshImages,
  setImageFile,
  setPinImage,
} from '../../../redux/modules/images';
import { getParam } from '../../../function/image';
import { s3 } from '../../../constant/setting';

const CreatePinContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const {
    selectedItem = {},
    markerPos = {},
    prevData = {},
    type = 'create',
  } = params;
  const { address, title = '', id } = selectedItem;
  const { lat, lng } = markerPos;
  const [pinTitle, setPinTitle] = useState(title);
  const [content, setContent] = useState('');
  const { pinNum } = useSelector(state => state.status);
  const { imageFile } = useSelector(state => state.images);
  const [pinImage, setImage] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [isFirst, setIsFirst] = useState(true);
  const [clickable, setClickable] = useState(false);
  const dispatch = useDispatch();

  const handlePress = async () => {
    console.log(type);
    if (imageFile !== null) {
      const param = await getParam(imageFile);
      s3.upload(param, async (err, data) => {
        if (err) {
          console.log('image upload err: ' + err);
          return;
        }
        const imgTag = `${data.Location}`;
        setImageLink(imgTag);
        dispatch(setPinImage(imgTag));
      });
    } else {
      pinCreate();
    }
  };

  const pinCreate = async () => {
    if (type === 'create') {
      const pinData = {
        title: pinTitle,
        content: content,
        image: imageLink,
        location: {
          lat: lat,
          lng: lng,
        },
        walkwayId: id,
      };
      const res = await createPin(pinData);
      if (res) {
        const { achieves = [] } = res;
        if (achieves.length > 0) {
          dispatch(setBadges(achieves));
        }
        dispatch(setPinNum(pinNum + 1));
        dispatch(await refreshImages());
        navigation.pop();
        navigation.goBack();
      }
    } else if (type === 'modify') {
      const pinData = {
        title: pinTitle,
        content: content,
        image: imageLink,
      };
      const { pinId } = prevData;
      const res = await updatePin(pinId, pinData);

      if (res !== null) {
        navigation.pop();
        navigation.goBack();
      }
    }
  };

  const titleTextChange = value => {
    setPinTitle(value);
  };
  const contentTextChange = value => {
    setContent(value);
  };
  useEffect(() => {
    dispatch(setImageFile(null));
  }, []);

  useEffect(() => {
    if (imageLink !== '' && type === 'create') {
      pinCreate();
    }
    if (imageLink !== prevData.image && type === 'modify' && !isFirst) {
      pinCreate();
    }
    setIsFirst(false);
  }, [imageLink]);

  useEffect(() => {
    if (type === 'modify') {
      const {
        title: prevTitle,
        content: prevContent,
        image: prevImage,
      } = prevData;
      setPinTitle(prevTitle);
      setContent(prevContent);
      setImage(prevImage);
      setImageLink(prevImage);
    }
  }, []);
  useEffect(async () => {
    if (type === 'create') {
      dispatch(await refreshImages());
    }
  }, []);

  useEffect(() => {
    if (
      pinTitle !== '' &&
      content !== '' &&
      (imageLink !== '' || imageFile !== null)
    ) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  }, [pinTitle, imageLink, content, imageFile]);
  return (
    <CreatePinScreen
      pinImage={pinImage}
      setImage={setImage}
      title={pinTitle}
      content={content}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      handlePress={handlePress}
      address={address}
      pinTitle={pinTitle}
      type={type}
      clickable={clickable}
    />
  );
};

export default CreatePinContainer;
