import { refresh } from '@react-native-community/netinfo';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { getNextData } from '../../../APIs';
import {
  getPinComments,
  getPinInfo,
  createPinComments,
  deletePin,
} from '../../../APIs/pin';
import { setBadges } from '../../../redux/modules/status';
import DetailPinScreen from '../screen/DetailPinScreen';

const DetailPinContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { id: pinId, index } = params;
  const { userId: myId } = useSelector(state => state.user);
  const { badges } = useSelector(state => state.status);
  const [pinComments, setPinComments] = useState([]);

  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

  const [pinData, setPinData] = useState({});
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const commentChange = text => {
    setComment(text);
  };

  const fetchData = async () => {
    const [info, res] = await Promise.all([
      getPinInfo(pinId),
      getPinComments(pinId, 1),
    ]);
    if (info) {
      const { pin } = info;
      setPinData(pin);
    }
    if (res) {
      const { comments, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setPinComments(comments);
      setPage(2);
    }
  };
  const modifyPin = async (item, index) => {
    const {
      content,
      createdAt,
      id,
      image,
      location,
      title,
      updatedAt,
      userId,
      walkwayId,
    } = item;
    if (userId !== myId) {
      navigation.navigate('DetailPin', { id, id, index, index });
    } else {
      navigation.navigate('CreatePin', {
        prevData: { pinId: id, title, content, image },
        type: 'modify',
      });
    }
  };

  const handleDeletePin = async id => {
    await deletePin(id);
    navigation.navigate('Home', {refresh:{}})
  };

  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getPinComments(pinId, page);
      if (res) {
        const { comments, links } = res;
        const { next } = links;
        if (next === '') setIsLast(true);
        setNextUrl(next);
        setPinComments(cur => cur.concat(comments));
        setPage(page + 1);
      }
      setIsDataLoading(false);
      return null;
    }
    return null;
  };

  const handlePostComment = async () => {
    const body = { content: comment, pinId: pinId };
    const res = await createPinComments(body);
    if (res) {
      const { achieves = [] } = res;
      if (achieves.length > 0) {
        dispatch(setBadges(achieves));
      }
      refresh();
    }
  };
  const refresh = () => {
    setPage(1);
    setIsLast(false);
    setNextUrl('');
    setComment('');
    setLoading(true);
    fetchData();
    setLoading(false);
  
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return loading ? (
    <Spinner visible />
  ) : (
    <DetailPinScreen
      index={index}
      pinData={pinData}
      pinComments={pinComments}
      comment={comment}
      badges={badges}
      commentChange={commentChange}
      handleLoadMore={handleLoadMore}
      handlePostComment={handlePostComment}
      modifyPin={modifyPin}
      handleDeletePin={handleDeletePin}
    />
  );
};

export default DetailPinContainer;
