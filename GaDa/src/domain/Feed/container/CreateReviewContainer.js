import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../../APIs/review';
import { s3 } from '../../../constant/setting';
import { showErrorToastMessage } from '../../../function/error';
import { getParam } from '../../../function/image';
import {
  setImageFileList,
  setWalkwayImages,
  refreshImages,
  setThumbnailImage,
} from '../../../redux/modules/images';
import {
  setBadges,
  setPinList,
  setTempWalkwayData,
} from '../../../redux/modules/status';
import CreateReviewScreen from '../screen/CreateReviewScreen';
import CreateWalkwayScreen from '../screen/CreateWalkwayScreen';

const CreateWalkwayContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { item = {}, type = 'create' } = params;

  const { address, distance, id, image, status, time, title } = item;
  // item : address, distance, id, image, path, status, time, title만생각하기
  const { walkwayImages, imageFileList, thumbnailImage, thumbnailFile } =
    useSelector(state => state.images);

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
      walkId: '',
    };
  });

  const titleTextChange = text => {
    setTitle(text);
  };
  const contentTextChange = text => {
    setContent(text);
  };

  const changeBody = () => {
    setRequestBody(prev => {
      const res = { ...prev };
      res.title = walkwayTitle;
      res.star = rate;
      res.images = imageList;
      res.content = content;
      res.walkId = item.id;
      return res;
    });
  };

  const createImages = async () => {
    if (imageFileList !== [] && imageFileList !== null) {
      imageFileList.map(async imageFile => {
        const param = await getParam(imageFile);
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

  const handleCreateReview = async () => {
    const res = await createReview(requestBody);
    if (res) {
      navigation.navigate('BottomTabFeed', { refresh: {} });
    } else {
      showErrorToastMessage();
    }
  };

  const handlePress = () => {
    if (imageFileList.length > 0) {
      createImages();
    } else {
      handleCreateReview();
    }
  };

  useEffect(() => {
    changeBody();
  }, [walkwayTitle, rate, imageList, item, content]);

  useEffect(() => {
    dispatch(setWalkwayImages(imageList));
  }, [imageList]);

  useEffect(() => {
    if (
      requestBody.images.length === imageFileList.length &&
      clickable && imageList.length === requestBody.images.length
    ) {
      handleCreateReview();
    }
  }, [requestBody.images]);

  useEffect(() => {
    if (walkwayTitle.length > 0 && content.length > 0 && rate > 0) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  }, [walkwayTitle, content, rate]);

  useEffect( () => {
    dispatch(refreshImages());
    dispatch(setThumbnailImage(image));
  }, []);

  return (
    <CreateReviewScreen
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
      address={address}
      thumbnailImage={thumbnailImage}
      type={type}
    />
  );
};

export default CreateWalkwayContainer;
