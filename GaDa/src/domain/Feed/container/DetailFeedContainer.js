import React from 'react';
import DetailFeedScreen from '../screen/DetailFeedScreen';
import { getDetailFeed } from '../../../APIs/review';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsRestart, setRestartWalkway } from '../../../redux/modules/status';

const DetailFeedContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { id } = params;
  const [feedInfo, setFeedInfo] = useState({});
  const [feedLike, setFeedLike] = useState(false);
  const [feedId, setFeedId] = useState(null);

  const [walkwayId, setWalkwayId] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    const res = await getDetailFeed(id);
    if (res) {
      const { feed } = res;
      setFeedInfo(feed);
      setFeedLike(feed.like);
      setFeedId(feed.id);
      setWalkwayId(feed.walkwayId)
      console.log(res);
      setLoading(false);
    }
  };

  const handleNavigate = (images) => {
    navigation.navigate('DetailImage', {
      idx: 0,
      images: images,
      ver: 'walkwayImages',
      // handlePress: {
      //   setImage: setStylistImg,
      //   setImageChanged: setIsImgChanged,
      // },
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onPress = () => {
    dispatch(setIsRestart(true));
    dispatch(setRestartWalkway({walkwayId: walkwayId}));
    navigation.navigate('BottomTabHome');
  };


  return (
    !loading && (
      <DetailFeedScreen
        feedInfo={feedInfo}
        feedLike={feedLike}
        feedId={feedId}
        handleNavigate={handleNavigate}
      />
    )
  );
};

export default DetailFeedContainer;
