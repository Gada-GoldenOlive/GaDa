import React from 'react';
import DetailFeedScreen from '../screen/DetailFeedScreen';
import { getDetailFeed } from '../../../APIs/review';
import { useEffect } from 'react';
import { useState } from 'react';

const DetailFeedContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { id } = params;
  const [feedInfo, setFeedInfo] = useState({});
  const [feedLike, setFeedLike] = useState(false);
  const [feedId, setFeedId] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await getDetailFeed(id);
    if (res) {
      const { feed } = res;
      setFeedInfo(feed);
      setFeedLike(feed.like);
      setFeedId(feed.id);

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
