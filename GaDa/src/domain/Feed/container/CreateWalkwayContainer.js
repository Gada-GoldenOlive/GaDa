import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../../APIs/review';
import { createWalk } from '../../../APIs/walk';
import { createWalkway, getAddressByCoords } from '../../../APIs/walkway';
import { s3 } from '../../../constant/setting';
import { getParam } from '../../../function/image';
import {
  setImageFileList,
  setWalkwayImages,
  setThumbnailImage,
  setThumbnailFile,
} from '../../../redux/modules/images';
import { setTempWalkwayData } from '../../../redux/modules/status';
import CreateWalkwayScreen from '../screen/CreateWalkwayScreen';

const CreateWalkwayContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { item = {} } = params;
  const { walkwayImages, imageFileList, thumbnailImage, thumbnailFile } =
    useSelector(state => state.images);
  const { isCreate } = useSelector(state => state.status);

  const [walkwayTitle, setTitle] = useState(item.title);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(0);
  const [clickable, setClickable] = useState(false);

  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const [requestBody, setRequestBody] = useState(() => {
    return {
      title: '',
      star: 0,
      content: '',
      images: [],
      walkId: 'cd031c7d-e69f-4bd2-bbd9-f6a14a13ed74',
    };
  });
  const [walkData, setWalkData] = useState({
    title: '',
    address: '서울',
    distance: item?.distance,
    time: item?.time,
    path: item?.path,
    image: '',
  });
  const [thumbnail, setThumbnail] = useState();

  const titleTextChange = text => {
    setTitle(text);
  };
  const contentTextChange = text => {
    setContent(text);
  };

  const fetchAddress = async () => {
    const res = await getAddressByCoords({
      x: item.path[0].lng,
      y: item.path[0].lat,
    });

    const data = res.documents[0];
    const { address, road_address: roadAddress } = data;

    if (roadAddress === null) {
      setWalkData(prev => ({
        ...prev,
        address: address.address_name,
      }));
    } else {
      setWalkData(prev => ({
        ...prev,
        address: roadAddress.address_name,
      }));
    }
  };
  const changeBody = () => {
    if (isCreate) {
      console.log('뭐야');
      setWalkData(prev => ({
        ...prev,
        title: walkwayTitle,
        // star: rate,
        distance: item.distance,
        time: item.time,
        path: item.path,
        image: thumbnailImage,
      }));
    } else {
      setRequestBody(prev => {
        const res = { ...prev };
        res.title = walkwayTitle;
        res.star = rate;
        res.images = imageList;
        res.content = content;
        res.walkId = item.id;
        return res;
      });
    }
  };

  const createImages = async () => {
    if (imageFileList !== [] && imageFileList !== null) {
      imageFileList.map(async imageFile => {
        const param = await getParam(imageFile);
        console.log(params);
        s3.upload(param, async (err, data) => {
          if (err) {
            console.log('image upload err: ' + err);
            return;
          }
          const imgTag = `${data.Location}`;
          setImageList(prev => [...prev, imgTag]);
        });
      });
    } else {
    }
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
        setThumbnail(imgTag);
      });
      // });
    } else {
    }
  };
  const handleCreateReview = async () => {
    console.log({ requestBody });
    const res = await createReview(requestBody);
    if (res) {
      navigation.goBack();
    }
  };

  const handleCreateWalkway = async () => {
    console.log({ walkData });
    const res = await createWalkway(walkData);

    const resWalk = await createWalk({
      time: walkData.time,
      distance: walkData.distance,
      pinCount: item.pinCount,
      finishStatus: 'UNFINISHED',
      walkwayId: res.id,
    });

    const forFeed = {
      title: walkData.title,
      // vehicle: 'walk',
      star: rate,
      content,
      images: imageList,
      walkId: resWalk.id,
    };
    dispatch(setTempWalkwayData(forFeed));

    navigation.navigate('Home', { refresh: {} });
  };
  const handlePress = () => {
    if (thumbnailFile !== '') {
      createThumbnailImages();
    }
    if (imageFileList.length > 0) {
      createImages();
    } else {
      if (isCreate) {
        console.log('장난?');
        handleCreateWalkway();
      } else {
        console.log('봐라');
        handleCreateReview();
      }
    }
  };

  useEffect(() => {
    changeBody();
  }, [walkwayTitle, rate, imageList, item, content, thumbnailImage]);

  useEffect(() => {
    dispatch(setWalkwayImages(imageList));
  }, [imageList]);
  useEffect(() => {
    dispatch(setThumbnailImage(thumbnail));
  }, [thumbnail]);

  useEffect(() => {
    console.log(
      imageList.length,
      imageFileList.length,
      requestBody.images.length,
    );
    if (
      requestBody.images.length === imageFileList.length &&
      clickable &&
      imageList.length > 0
    ) {
      handleCreateReview();
    }
  }, [requestBody.images]);
  useEffect(() => {
    console.log('너냐');
    if (thumbnailFile !== '' && walkData.image !== '' && clickable) {
      handleCreateWalkway();
    }
  }, [walkData.image]);

  useEffect(() => {
    if (walkwayTitle.length > 0 && content.length > 0 && rate > 0) {
      if (isCreate) {
        if (thumbnailFile !== '') {
          setClickable(true);
        } else {
          setClickable(false);
        }
      } else {
        setClickable(true);
      }
    } else {
      setClickable(false);
    }
  }, [walkwayTitle, content, rate, thumbnailFile]);

  useEffect(() => {
    dispatch(setWalkwayImages([]));
    dispatch(setImageFileList([]));
    dispatch(setThumbnailImage(''));
    dispatch(setThumbnailFile(''));
    fetchAddress();
  }, []);

  return (
    <CreateWalkwayScreen
      navigation={navigation}
      item={item}
      walkwayTitle={walkwayTitle}
      content={content}
      rate={rate}
      clickable={clickable}
      imageFileList={imageFileList}
      walkwayImages={walkwayImages}
      setRate={setRate}
      titleTextChange={titleTextChange}
      contentTextChange={contentTextChange}
      handlePress={handlePress}
      address={isCreate ? walkData.address : null}
      thumbnailImage={thumbnailImage}
      thumbnailFile={thumbnailFile}
    />
  );
};

export default CreateWalkwayContainer;
