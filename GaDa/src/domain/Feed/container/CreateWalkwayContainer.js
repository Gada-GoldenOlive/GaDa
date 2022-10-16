import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../../APIs/review';
import { createWalk } from '../../../APIs/walk';
import { createWalkway } from '../../../APIs/walkway';
import { s3 } from '../../../constant/setting';
import { getParam } from '../../../function/image';
import {
  setImageFileList,
  setWalkwayImages,
} from '../../../redux/modules/images';
import CreateWalkwayScreen from '../screen/CreateWalkwayScreen';

const CreateWalkwayContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { item = {} } = params;
  const { walkwayImages, imageFileList } = useSelector(state => state.images);
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
  const [walkData, setWalkData] = useState(() => ({
    title: '',
    address: '',
    distance: 0,
    time: 0,
    path: [
      {
        lat: 0,
        lng: 0,
      },
    ],
    image: '',
  }));

  const titleTextChange = text => {
    setTitle(text);
  };
  const contentTextChange = text => {
    setContent(text);
  };

  const changeBody = () => {
    if (isCreate) {
      setWalkData(prev => {
        const res = { ...prev };
        res.title = walkwayTitle;
        res.address = rate;
        res.distance = item.distance;
        res.time = item.time;
        res.path = item.locationList;
        res.image = imageList;
        return res;
      });
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
    console.log({ requestBody });
    const res = await createReview(requestBody);
    if (res) {
      navigation.goBack();
    }
  };

  const handleCreateWalkway = async () => {
    console.log({ walkData });
    const res = await createWalkway(walkData);
    if (res?.isValid) {
      navigation.goBack();
    }
  };
  const handlePress = () => {
    if (imageFileList.length > 0) {
      createImages();
    } else {
      if (isCreate) {
        handleCreateWalkway();
      } else {
        handleCreateReview();
      }
    }
  };

  useEffect(() => {
    if (isCreate) {
      handleCreateWalkway();
    } else {
      changeBody();
    }
  }, [walkwayTitle, rate, imageList, item, content]);

  useEffect(() => {
    dispatch(setWalkwayImages(imageList));
  }, [imageList]);

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
    if (walkwayTitle.length > 0 && content.length > 0 && rate > 0) {
      setClickable(true);
    } else {
      setClickable(false);
    }
  }, [walkwayTitle, content, rate]);

  useEffect(() => {
    dispatch(setWalkwayImages([]));
    dispatch(setImageFileList([]));
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
    />
  );
};

export default CreateWalkwayContainer;
