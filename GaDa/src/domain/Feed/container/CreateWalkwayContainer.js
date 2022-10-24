import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWalkway, getAddressByCoords } from '../../../APIs/walkway';
import { getParam } from '../../../function/image';
import { s3 } from '../../../constant/setting';
import {
  setBadges,
  setPinList,
  setTempWalkwayData,
} from '../../../redux/modules/status';
import { createPin } from '../../../APIs/pin';
import { useEffect } from 'react';
import {
  refreshImages,
  setThumbnailImage,
} from '../../../redux/modules/images';
import CreateWalkwayScreen from '../screen/CreateWalkwayScreen';
import { useState } from 'react';
import { createWalk } from '../../../APIs/walk';

const CreateWalkwayContainer = ({ navigation, route }) => {
  // 산책로 제작
  // 제목, 시간, 거리, 썸네일
  const { params = {} } = route;
  const { item = {} } = params;
  const dispatch = useDispatch();

  const { thumbnailImage, thumbnailFile } = useSelector(state => state.images);
  const { pinList, badges } = useSelector(state => state.status);

  const [clickable, setClickable] = useState(false);

  const [walkwayTitle, setTitle] = useState(item.title);
  const [thumbnail, setThumbnail] = useState('');
  const [walkwayAddress, setWalkwayAddress] = useState('');
  const [requestBody, setRequestBody] = useState(() => {
    return {
      title: '',
      address: walkwayAddress,
      distance: item?.distance,
      time: item?.time,
      path: item?.path,
      image: '',
      status: 'PRIVATE',
    };
  });
  const [walkData, setWalkData] = useState({
    time: item.time,
    distance: item.distance,
    pinCount: item.pinCount,
    finishStatus: 'UNFINISHED',
  });
  const fetchAddress = async () => {
    const res = await getAddressByCoords({
      x: item.path[0].lng,
      y: item.path[0].lat,
    });
    const data = res.documents[0];
    const { address, road_address: roadAddress } = data;
    if (roadAddress === null) {
      setWalkwayAddress(address.address_name);
    } else {
      setWalkwayAddress(roadAddress.address_name);
    }
  };

  const titleTextChange = text => {
    setTitle(text);
  };
  const createThumbnailImages = async () => {
    if (thumbnailFile !== '' && thumbnailFile !== null) {
      // imageFileList.map(async imageFile => {
      const param = await getParam(thumbnailFile);
      s3.upload(param, async (err, data) => {
        if (err) {
          console.log('image upload err: ' + err);
          return;
        }
        const imgTag = `${data.Location}`;
        dispatch(setThumbnailImage(imgTag));
        setThumbnail(imgTag);
      });
    }
  };

  const handleCreateWalkway = async () => {
    const res = await createWalkway(requestBody);
    if (res) {
      const { achieves = [] } = res;
      if (achieves.length > 0) {
        dispatch(setBadges([...badges, ...achieves]));
      }

      const resWalk = await createWalk({
        time: walkData.time,
        distance: walkData.distance,
        pinCount: item.pinCount,
        finishStatus: 'UNFINISHED',
        walkwayId: res.id,
      });

      if (resWalk) {
        const { achieves = [] } = resWalk;
        if (achieves.length > 0) {
          dispatch(setBadges([...badges, ...achieves]));
        }
      }

      if (pinList.length > 0) {
        pinList.map(async pinData => {
          const pinRes = await createPin({ ...pinData, walkwayId: res.id });
          if (pinRes) {
            const { achieves = [] } = pinRes;
            if (achieves.length > 0) {
              dispatch(setBadges([...badges, ...achieves]));
            }
          }
        });
      }
      const walkwayforUpdate = {
        ...requestBody,
        id: res.id,
        walkId: resWalk.id
      };
      const forFeed = {
        ...requestBody,
        id: resWalk.id,
      }
      dispatch(setTempWalkwayData({ walkwayforUpdate, forFeed }));
      dispatch(setPinList([]));
      navigation.navigate('Home', { refresh: {}, endShareModal: true });
    } else {
      showErrorToastMessage();
      dispatch(setPinList([]));
      navigation.navigate('Home', { refresh: {}, endShareModal: false });
    }
  };

  const changeBody = () => {
    setRequestBody(prev => ({
      ...prev,
      title: walkwayTitle,
      distance: item.distance,
      time: item.time,
      path: item.path,
      image: thumbnail,
      status: 'PRIVATE',
      address: walkwayAddress,
    }));
    setWalkData(prev => ({
      ...prev,
      title: walkwayTitle,
      distance: item.distance,
      time: item.time,
      path: item.path,
      image: thumbnailImage,
      status: 'PRIVATE',
    }));
  };

  const handlePress = () => {
    createThumbnailImages();
  };
  useEffect(() => {
    changeBody();
  }, [walkwayTitle, thumbnailImage, thumbnail, item, walkwayAddress]);

  useEffect(() => {
    if (walkwayTitle.length > 0 && thumbnailFile !== null) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  }, [walkwayTitle, thumbnailFile]);

  useEffect(() => {
    if (requestBody.image !== '' && clickable && thumbnailFile !== null) {
      handleCreateWalkway();
    }
  }, [requestBody]);

  useEffect(() => {
    dispatch(refreshImages());
    fetchAddress();
  }, []);

  useEffect(() => {
    refreshImages();
  }, []);

  return (
    <CreateWalkwayScreen
      navigation={navigation}
      item={item}
      walkwayTitle={walkwayTitle}
      clickable={clickable}
      titleTextChange={titleTextChange}
      handlePress={handlePress}
      address={walkwayAddress}
      thumbnailImage={thumbnailImage}
      thumbnailFile={thumbnailFile}
    />
  );
};

export default CreateWalkwayContainer;
