import { View, TouchableWithoutFeedback, LogBox } from 'react-native';
import React, { useRef, useState } from 'react';
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBottomTabVisible,
  setCurrentPosition,
  setEndTime,
  setIsWalking,
  setPinNum,
} from '../../../redux/modules/status';
import { useEffect } from 'react';
import {
  getCurrentTime,
  getDuringTime,
  getIdInLocalStorage,
} from '../../../function';
import { setStartTime } from '../../../redux/modules/status';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { createWalk } from '../../../APIs/walk';
import { setUserId } from '../../../redux/modules/user';

// * 현재위치
// 일정 시간 후 주기적으로 반복해서 geoLocation 해주기!
// 가능하면 거리 계산해서 일정 거리 이상 이동했을 때만 전송하도록 하기
//

const CURRENTPOS = 'currentPos';

const HomeContainer = ({ navigation, route }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // 현재위치
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  // 내위치 리스트
  const [locationList, setLocationList] = useState([]);
  // 기록 시작
  const [recording, setRecording] = useState(false);
  // 이전 기록
  const [beforeRecord, setBeforeRecord] = useState(null);
  // overview visible
  const [isVisible, setIsVisible] = useState(false);
  // 현재 선택된 산책로
  const [selectedItem, setSelectedItem] = useState({});
  // 자세한 정보 visible
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  // 산책로 리스트 component visible
  const [listIsVisible, setListIsVisible] = useState(true);
  // 끝내겠습니까? 모달 visible
  const [endModalVisible, setEndModalVisible] = useState(false);
  // 산책 종료 모달 visible
  const [walkEnd, setWalkEnd] = useState(false);
  // walk data
  const [walkData, setWalkData] = useState({});
  // start modal
  const [startModalVisible, setStartModalVisible] = useState(false);
  // 생성한 핀 개수
  const { pinNum } = useSelector(state => state.status);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [nowPath, setNowPath] = useState([]);
  const [startPoint, setStartPoint] = useState({});
  const [nowPins, setNowPins] = useState([]);
  const [isWalkwayFocused, setIsWalkwayFocused] = useState(false);
  const { userId } = useSelector(state => state.user);
  const geoLocation = ref => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        setLatitude(latitude);
        setLongitude(longitude);
        handleConnection(ref, CURRENTPOS); // 웹에 현재 위치 보내기
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  };

  const recordPosition = () => {
    const newId = Geolocation.getCurrentPosition(
      position => {
        if (position) {
          let updateFlag = true;
          const newRecord = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // 시작
          if (beforeRecord !== null) {
            // console.log(beforeRecord, newRecord);
            const dist = getDistance(beforeRecord, newRecord, 0.1);
            // if (dist < 50) {
            //   updateFlag = false;
            // }
          }
          if (updateFlag) {
            setCoords(newRecord);
            setBeforeRecord(newRecord);
            setLocationList(locationList => [...locationList, newRecord]);
            dispatch(setCurrentPosition(newRecord));
          }
        }
      },
      err => {
        console.log(err.message);
      },
      { enableHighAccuracy: false },
    );

    setRecording(true);
  };

  const handleConnection = (ref, ver) => {
    var path = [];
    var pins = [];
    var start = {};
    if (ver === 'selectWalkway') {
      path = nowPath;
      pins = nowPins;
      start = startPoint;
    }
    const generateOnMessageFunction = data =>
      `(function() {
    window.dispatchEvent(new MessageEvent('message', {data: ${JSON.stringify(
      data,
    )}}));
  })()`;

    ref.current.injectJavaScript(
      generateOnMessageFunction({
        type: ver,
        path: path,
        pins: pins,
        startPoint: start,
      }),
    );
  };

  const closeModal = () => {
    setIsVisible(false);
    setListIsVisible(true);
  };

  const handleClickItem = item => {
    setIsVisible(true);
    setListIsVisible(false);
    setSelectedItem(item);
  };

  const closeInformation = () => {
    setIsInformationVisible(false);
  };
  const handleClickWalkway = () => {
    setIsInformationVisible(true);
    closeModal();
  };

  const startWalk = () => {
    const res = getCurrentTime();
    dispatch(setStartTime(res));
    setIsVisible(false);
    setListIsVisible(false);
    setIsInformationVisible(false);
    setRecording(true);
    dispatch(setIsWalking(true));
    setStartModalVisible(false);
  };

  const stopWalk = () => {
    endWalk('UNFINISHED');
    console.log('stopWalk');
    setWalkEnd(true);
    closeEndModal();
  };

  const openEndModal = () => {
    setEndModalVisible(true);
  };
  const closeEndModal = () => {
    setEndModalVisible(false);
    setIsVisible(false);
  };

  const finishRecord = () => {
    setRecording(false);
    console.log({ locationList });
    if (locationList.length >= 1) {
      return getDistance(
        locationList[0],
        locationList[locationList.length - 1],
        0.1,
      );
    }
    return 0;
  };

  const endWalk = async status => {
    console.log('endWalk');
    const res = getCurrentTime();
    dispatch(setEndTime(res));
    dispatch(setIsWalking(false));
    const time = getDuringTime();
    const dis = finishRecord().toFixed(2);
    console.log({ res, dis });
    const nowWalk = {
      time: time,
      distance: dis / 10,
      finishStatus: status,
      walkwayId: selectedItem.id,
      userId: userId,
    };
    setWalkData(nowWalk);

    const res2 = await createWalk(nowWalk);
  };

  const resetData = () => {
    console.log('reset');
    setLocationList([]);
    setCoords({ latitude: null, longitude: null });
    setRecording(false);
    setBeforeRecord(null);
    setIsVisible(false);
    setSelectedItem({});
    setIsInformationVisible(false);
    setListIsVisible(true);
    setEndModalVisible(false);
    setWalkEnd(false);
    setWalkData({});
    dispatch(setPinNum(0));
    dispatch(setIsWalking(false));
  };

  const openStartModal = () => {
    setIsVisible(false);
    setListIsVisible(false);
    setIsInformationVisible(false);
    setStartModalVisible(true);
  };

  const closeStartModal = () => {
    setStartModalVisible(false);
    setListIsVisible(true);
  };
  // useEffect(() => {
  //   console.log({ isAuthenticated });
  //   if (!isAuthenticated) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'SignIn' }],
  //     });
  //   }
  // }, [isAuthenticated]);
  useEffect(() => {
    // walkEnd일때 안보여야하고 information visible일때 안보여야한다
    const tabVisible = !walkEnd && !isInformationVisible;

    dispatch(setBottomTabVisible(tabVisible));
  }, [walkEnd, isInformationVisible]);

  useEffect(() => {
    setInterval(() => {
      if (recording && !loading) {
        recordPosition();
      }
    }, 1000);
  }, [recording]);

  useEffect(() => {
    resetData();
  }, []);
  const reset = async () => {
    const res = await getIdInLocalStorage();

    dispatch(setUserId(res));
  };
  useEffect(() => {
    reset();
  }, []);

  return (
    <HomeScreen
      geoLocation={geoLocation}
      handleConnection={handleConnection}
      isVisible={isVisible}
      selectedItem={selectedItem}
      closeModal={closeModal}
      handleClickItem={handleClickItem}
      isInformationVisible={isInformationVisible}
      closeInformation={closeInformation}
      handleClickWalkway={handleClickWalkway}
      startWalk={startWalk}
      listIsVisible={listIsVisible}
      stopWalk={stopWalk}
      endModalVisible={endModalVisible}
      closeEndModal={closeEndModal}
      openEndModal={openEndModal}
      walkEnd={walkEnd}
      resetData={resetData}
      walkData={walkData}
      pinNum={pinNum}
      nowPath={nowPath}
      setNowPath={setNowPath}
      setStartPoint={setStartPoint}
      nowPins={nowPins}
      setNowPins={setNowPins}
      setIsWalkwayFocused={setIsWalkwayFocused}
      startModalVisible={startModalVisible}
      openStartModal={openStartModal}
      closeStartModal={closeStartModal}
    />
  );
};

export default HomeContainer;
