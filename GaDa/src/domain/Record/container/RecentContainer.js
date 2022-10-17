import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getNextData } from '../../../APIs';
import { getMyWalkList } from '../../../APIs/walkway';
import RecentScreen from '../screen/RecentScreen';

const RecentContainer = ({ navigation, route }) => {
  const [recentWalks, setRecentWalks] = useState([]);
  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

  const handleNavigateRestart = item => {
    navigation.navigate('RestartWalks', {item: item});
  }

  
  const getRecentWalks = async () => {
    /*
    {"walks": [{"createdAt": "2022-10-12T17:55:14.461Z", "distance": 160, "finishStatus": "FINISHED", 
    "id": "36040ddd-b16a-47f0-99b0-9a5368dcba76", "image": "https://picsum.photos/400/250/?image=481", 
    "rate": 9.5, "title": "장한 평역 군자역 산책로"}]}
    */
    const res = await getMyWalkList(1);
    if (res) {
      const { walks, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setRecentWalks(walks);
      setPage(2);
    }
  };
  

  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getNextData(nextUrl);
      if (res) {
        const { walks, links } = res;
        const { next } = links;
        if (next === '') setIsLast(true);
        setNextUrl(next);
        setRecentWalks(cur => cur.concat(walks));
        setPage(page + 1);
      }
      setIsDataLoading(false);
      return null;
    }
    return null;
  };


  useEffect(() => {
    getRecentWalks();
  }, []);

  return <RecentScreen handleNavigateRestart={handleNavigateRestart} recentWalks={recentWalks} handleLoadMore={handleLoadMore}/>;
};

export default RecentContainer;
