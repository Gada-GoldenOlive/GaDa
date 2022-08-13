import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

const InfiniteScroll = props => {
  const { data: propDatas = [], offset = 50, renderItem } = props;
  const [data, setData] = useState([...propDatas]);
  const [throttle, setThrottle] = useState(false);
  const infListRef = useRef();
  const checkScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // layoutMeasurement => content 의 layout 측정값 높이, 넓이 고정임
    // contentOffset => 스크롤에 따른 x, y 의 위치
    // content size => 현재 보여지는 부분 및 안보여지는 부분 포함 사이즈

    // 무조건 오르쪽으로 스크롤을 한다고 전제
    // console.log({ layoutMeasurement, contentOffset, contentSize });

    if (
      contentOffset.x + layoutMeasurement.width >=
      contentSize.width - offset
    ) {
      if (data.length >= propDatas.length * 5) {
        setData(prev => [...prev.slice(propDatas.length * 2)]);
      } else {
        setData(prev => [...prev, ...propDatas]);
      }
    }
  };
  const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        checkScroll({ layoutMeasurement, contentOffset, contentSize });
        setThrottle(false);
      }, 300);
    }
  };
  useEffect(() => {
    setData(prev => [...prev, ...prev, ...prev]);
    setTimeout(() => {
      infListRef.current.scrollToIndex({
        animated: false,
        index: propDatas.length,
      });
    }, 500);
    return () => setThrottle(true);
  }, []);

  return (
    <FlatList
      {...props}
      ref={infListRef}
      data={data}
      keyExtractor={(item, index) => `key ${index}`}
      horizontal
      renderItem={renderItem}
      onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default React.memo(InfiniteScroll);
