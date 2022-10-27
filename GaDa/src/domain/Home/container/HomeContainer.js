import { View, TouchableWithoutFeedback, LogBox, Platform } from 'react-native';
import React, { useRef, useState } from 'react';
import { getDistance } from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import HomeScreen from '../screen/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBadges,
  setBottomTabVisible,
  setCurrentPosition,
  setEndTime,
  setIsCreate,
  setIsRestart,
  setIsWalking,
  setPinList,
  setPinNum,
} from '../../../redux/modules/status';
import { useEffect } from 'react';
import {
  getCurrentTime,
  getDistanceFromLatLonInKm,
  getDuringTime,
  getIdInLocalStorage,
} from '../../../function';
import { setStartTime } from '../../../redux/modules/status';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { createWalk } from '../../../APIs/walk';
import { setUserId } from '../../../redux/modules/user';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWalkwayInfo, updateWalkway } from '../../../APIs/walkway';
import { set } from 'react-native-reanimated';
import { createReview } from '../../../APIs/review';
import jwtDecode from 'jwt-decode';
import { createPin } from '../../../APIs/pin';
import UserGuideLineScreen from '../screen/UserGuideLineScreen';

// * 현재위치
// 일정 시간 후 주기적으로 반복해서 geoLocation 해주기!
// 가능하면 거리 계산해서 일정 거리 이상 이동했을 때만 전송하도록 하기
//

const CURRENTPOS = 'currentPos';

const HomeContainer = ({ navigation, route }) => {
  const [currentPos, setCurrentPos] = useState({});

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // 현재위치
  const [coords, setCoords] = useState({ lat: null, lng: null });
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
  // 산책로 제작에서 산책 종료 후 공유하시겠어요 모달 visible
  const [endShareModalVisible, setEndShareModalVisible] = useState(false);

  // walk data
  const [walkData, setWalkData] = useState({});
  // start modal
  const [startModalVisible, setStartModalVisible] = useState(false);

  // 받은 배지
  const { badges } = useSelector(state => state.status);

  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [nowPath, setNowPath] = useState([]);
  const [startPoint, setStartPoint] = useState({});
  const [nowPins, setNowPins] = useState([]);
  const [isWalkwayFocused, setIsWalkwayFocused] = useState(false);
  const [tmpNewRecord, setTmpNewRecord] = useState(null);
  const { userId } = useSelector(state => state.user);

  // redux 정보
  const {
    pinNum,
    currentPosition,
    isRestart,
    isCreate,
    tempWalkwayData,
    pinList,
  } = useSelector(state => state.status);

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCurrentPos({ lat: latitude, lng: longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  // useEffect(() => {
  //   geoLocation();
  // }, []);

  useEffect(() => {
    // console.log({ beforeRecord, tmpNewRecord });
    if (tmpNewRecord !== null) {
      let updateFlag = true;
      // 시작
      let dist;

      if (beforeRecord !== null) {
        // console.log(beforeRecord, newRecord);

        // const dist = getDistance(beforeRecord, newRecord, 0.1);

        dist = getDistanceFromLatLonInKm({
          lat1: beforeRecord.lat,
          lng1: beforeRecord.lng,
          lat2: tmpNewRecord.lat,
          lng2: tmpNewRecord.lng,
        });

        // console.log(dist * 1000);
        if (dist * 1000 < 20) {
          updateFlag = false;
        }
      }
      if (updateFlag) {
        setCoords(tmpNewRecord);
        setBeforeRecord(tmpNewRecord);
        setLocationList(locationList => [...locationList, tmpNewRecord]);
        dispatch(setCurrentPosition(tmpNewRecord));
      }
    }
  }, [tmpNewRecord]);

  const recordPosition = () => {
    // console.log('너냐');
    const newId = Geolocation.getCurrentPosition(
      position => {
        if (position) {
          // let updateFlag = true;
          const newRecord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setTmpNewRecord(newRecord);
        }
      },
      err => {
        console.log(err.message);
      },
      {
        enableHighAccuracy: Platform.OS === 'ios' ? true : false,
        accurace: { ios: 'best' },
        timeout: 1000,
        maximumAge: 10000,
      },
    );

    setRecording(true);
  };

  const handleConnection = (ref, ver) => {
    var path = [];
    var pins = [];
    var start = {};
    var nowPos = {};
    if (ver === 'selectWalkway') {
      path = nowPath;
      pins = nowPins;
      start = startPoint;
    } else if (ver === 'restartWalkway') {
      // console.log({ selectedItem });
      path = selectedItem.path;
      pins = selectedItem.pinCount;
      start = selectedItem.startPoint;
      // console.log({ path, pins, start, name: selectedItem.title });
    } else if (ver === 'locationList') {
      path = locationList;
      start = locationList[0];
      nowPos = locationList[locationList.length - 1];
    } else if (ver === 'searchThisPos') {
      // console.log('hi');
    }
    // 적지는 않았지만 currentPos도 되고 있음 -> 변수 선언을 안 할뿐
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
        name: selectedItem.title,
        nowPos,
      }),
    );
  };

  const closeModal = () => {
    if (isRestart) {
      // setCurrentPos(currentPosition);
      dispatch(setIsRestart(false));
    }
    setIsVisible(false);
    setListIsVisible(true);
  };

  const handleClickItem = item => {
    // console.log({ item });
    setIsVisible(true);
    setListIsVisible(false);
    setSelectedItem(item);
  };

  const closeInformation = () => {
    console.log('closeinfo');
    if (isRestart) {
      // setCurrentPos(currentPosition);
      dispatch(setIsRestart(false));
    }

    setIsInformationVisible(false);
  };
  const handleClickWalkway = () => {
    setIsInformationVisible(true);
    // closeModal();
    setIsVisible(false);
    setListIsVisible(true);
  };

  const startWalk = () => {
    const res = getCurrentTime();
    dispatch(setStartTime(res));
    setIsVisible(false);
    setListIsVisible(false);
    // dispatch(setIsRestart(false)); -> resetData에서 함
    setIsInformationVisible(false);
    setRecording(true);
    dispatch(setIsWalking(true));
    setStartModalVisible(false);
  };

  const stopWalk = () => {
    endWalk('UNFINISHED');

    console.log('stopWalk');
    setWalkEnd(true);
    // openEndShareModal();

    closeEndModal();
  };

  const openEndModal = () => {
    setEndModalVisible(true);
  };
  const closeEndModal = () => {
    setEndModalVisible(false);
    setIsVisible(false);
  };

  const openEndShareModal = () => {
    setEndShareModalVisible(true);
  };
  const closeEndShareModal = () => {
    setEndShareModalVisible(false);
  };

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: '산책로 생성 실패!',
      text2: '거리가 짧아 산책로 생성에 실패하였습니다',
    });
  };

  const showToast2 = () => {
    Toast.show({
      type: 'error',
      text1: '산책로 생성 실패!',
      text2: '오류로 인해 산책로 생성에 실패하였습니다',
    });
  };

  const handleNavigateCreate = () => {
    console.log(locationList);
    // openEndShareModal();
    if (walkData.distance < 10 || locationList.length < 1) {
      showToast();
      resetData();
    } else {
      navigation.navigate('CreateWalkway', {
        item: {
          ...walkData,
          path: locationList,
          title: '',
          image: '',
        },
      });
    }
  };

  const handleShareButton = async () => {
    const walkway = tempWalkwayData.walkwayforUpdate;
    const forFeed = tempWalkwayData.forFeed;
    const id = walkway.id;
    const res = await updateWalkway(id, { ...walkway, status: 'NORMAL' });
    if (res) {
      navigation.navigate('CreateReview', { item: { ...forFeed } });
    } else {
      showToast2();
    }
    closeEndShareModal();
  };

  // 산책로 제작시 상세주소를 받기 위해
  const [getDetailAddress, setGetDetailAddress] = useState(false);
  const [detailAddress, setDetailAddress] = useState('');
  const finishRecord = () => {
    setRecording(false);
    console.log({ locationList });
    if (locationList.length >= 1) {
      setGetDetailAddress(true);
      return (
        1000 *
        getDistanceFromLatLonInKm({
          lat1: locationList[0].lat,
          lng1: locationList[0].lng,
          lat2: locationList[locationList.length - 1].lat,
          lng2: locationList[locationList.length - 1].lng,
        })
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
    const dis = finishRecord();
    console.log(dis);
    const nowWalk = {
      time: time,
      distance: dis,
      pinCount: pinNum,
      finishStatus: status,
      walkwayId: selectedItem.id,
    };
    setWalkData(nowWalk);

    if (!isCreate) {
      const res2 = await createWalk(nowWalk);
      if (pinList.length > 0) {
        pinList.map(async pinData => {
          const pinRes = await createPin({
            ...pinData,
            walkwayId: selectedItem.id,
          });
          if (pinRes) {
            const { achieves = [] } = pinRes;
            if (achieves.length > 0) {
              dispatch(setBadges([...badges, ...achieves]));
            }
          }
        });
      }
      dispatch(setPinList([]));
    }

    // setCurrentPos(currentPosition);
  };

  const resetData = () => {
    console.log('reset');
    setLocationList([]);
    setCoords({ lat: null, lng: null });
    setRecording(false);
    setBeforeRecord(null);
    setTmpNewRecord(null);
    setIsVisible(false);
    setSelectedItem({});
    setIsInformationVisible(false);
    setListIsVisible(true);
    setEndModalVisible(false);
    setEndShareModalVisible(false);
    setWalkEnd(false);
    setWalkData({});
    dispatch(setPinNum(0));
    dispatch(setIsWalking(false));
    dispatch(setIsCreate(false));
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

  const getAccess = async () => {
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }
  };

  const reset = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    console.log('home', accessToken);
    if (accessToken !== null) {
      const res = jwtDecode(accessToken);
      const { sub: userId } = res;
      dispatch(setUserId(userId));
      await AsyncStorage.setItem('id', userId);
    }
  };

  useEffect(() => {
    getAccess();
    //navigation.navigate('UserGuide');
  }, [isAuthenticated]);

  useEffect(() => {
    // walkEnd일때 안보여야하고 information visible일때 안보여야한다
    const tabVisible = !walkEnd && !isInformationVisible;

    dispatch(setBottomTabVisible(tabVisible));
  }, [walkEnd, isInformationVisible]);

  const pathRef = useRef();
  useEffect(() => {
    // recordPosition();
    // console.log('hi');

    if (recording && !loading) {
      recordPosition();
      pathRef.current = setInterval(() => {
        recordPosition();
      }, 3000);
    } else {
      clearInterval(pathRef.current);
      pathRef.current = null;
    }
    // if (!recording) clearInterval(interval);
  }, [recording]);

  useEffect(() => {
    reset();
    resetData();
  }, []);

  useEffect(() => {
    reset();
    resetData();
  }, [route.params?.refresh]);

  useEffect(() => {
    if (route.params?.endShareModal) {
      openEndShareModal();
    }
  }, [route.params?.endShareModal]);


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
      setIsVisible={setIsVisible}
      setListIsVisible={setListIsVisible}
      setSelectedItem={setSelectedItem}
      setCurrentPos={setCurrentPos}
      currentPos={currentPos}
      endShareModalVisible={endShareModalVisible}
      closeEndShareModal={closeEndShareModal}
      openEndShareModal={openEndShareModal}
      handleNavigateCreate={handleNavigateCreate}
      getDetailAddress={getDetailAddress}
      setGetDetailAddress={setGetDetailAddress}
      setDetailAddress={setDetailAddress}
      badges={badges}
      handleShareButton={handleShareButton}
      locationList={locationList}
    />
  );
};

export default HomeContainer;
