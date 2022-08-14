import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import AddMarker from "../functions/AddMarker";
import DrawCurrentPos from "../functions/DrawCurrentPos";
import DrawMarkers from "../functions/DrawMarkers";
import DrawMarker from "../functions/DrawMarkers";
import DrawPolyline from "../functions/DrawPolyline";
import DrawStartPoint from "../functions/DrawStartPoint";
import GeoLocationMarker from "../functions/GeolocationMarker";
import MovePinText from "./components/MovePinText";
import PinPosSubmitButton from "./components/PinPosSubmitButton";

import "./css/MapScreen.css";

const MapScreen = ({
  currentPosition,
  position,
  handleSubmit,
  setPosition,
}) => {
  const [line, setLine] = useState();
  const [isGeolocation, setIsGeolocation] = useState(false);
  const [isCurrentPosClicked, setIsCurrentPosClicked] = useState(false);
  const [isAddPinClicked, setIsAddPinClicked] = useState(false);
  const [isSubmitPinPosClicked, setIsSubmitPinPosClicked] = useState(false);
  //console.log(line.getLength());

  const [state, setState] = useState({
    center: {
      lat: 37.54699,
      lng: 127.09598,
    },
    errMsg: null,
    isLoading: true,
  });
  const [currentState, setCurrentState] = useState(state);
  const [walkwayPath, setWalkwayPath] = useState("null");
  const [walkwayPins, setWalkwayPins] = useState("null");
  const [pathStartPoint, setPathStartPoint] = useState("null");

  const [movingCurrentList, setMovingCurrentList] = useState();

  const list = [
    { lat: 37.5351787566412, lng: 126.90313420225422 },

    { lat: 37.53710837379388, lng: 126.90417148286825 },
    { lat: 37.53732658502673, lng: 126.9040990030548 },

    { lat: 37.53738716655828, lng: 126.90404758556996 },

    { lat: 37.537608987470044, lng: 126.90424390281818 },
    { lat: 37.537703211212765, lng: 126.90416109026054 },

    { lat: 37.53779011809602, lng: 126.90396797513036 },
  ];

  const getDistance = (lat1, lat2, lng1, lng2) => {
    var X = ((Math.cos(lat1) * 6400 * 2 * 3.14) / 360) * Math.abs(lat1 - lat2);

    var Y = 111 * Math.abs(lng1 - lng2);

    var D = Math.sqrt(X * X + Y * Y);

    return D;
  };
  const autoGeoLocation = () => {
    if (navigator.geolocation) {
      let before_record = null;
      navigator.geolocation.watchPosition(
        (position) => {
          let updateFlag = true;
          const now = new Date();
          const new_record = {
            err: 0,
            time: now.toLocaleTimeString(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          //시작
          if (before_record !== null) {
            const dist = getDistance({
              lat1: before_record.latitude,
              lng1: before_record.longitude,

              lat2: new_record.latitude,
              lng2: new_record.longitude,
            });

            alert(dist);
            if (dist < 0.05) {
              updateFlag = false;
            }
          }
          if (updateFlag) {
            setCurrentState((prev) => ({
              ...prev,
              center: {
                lat: new_record.latitude,
                lng: new_record.longitude,
              },
              isLoading: false,
            }));

            before_record = new_record;
            setMovingCurrentList((locationList) => [
              ...locationList,
              new_record,
            ]);
          }
          //setIsGeolocation(true);
        },
        (err) => {
          console.log(err.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      //handleSubmit("currentPos", currentState.center);
      // setRecording(true);
      // setWatchId(newId)
    }
  };

  const geoLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setCenter({
          //   lat: position.coords.latitude, // 위도
          //   lng: position.coords.longitude, // 경도
          // });
          //alert('set하는뎅')
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          setIsGeolocation(true);
          handleSubmit("currentPos", {
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          });
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  };
  useEffect(() => {
    geoLocation();
    //autoGeoLocation();
  }, []);

  useEffect(() => {
    if (isGeolocation) {
      setCurrentState(state);
      setIsGeolocation(false);
    }
  }, [isGeolocation]);

  const handleReceiveMessage = async () => {
    await window.addEventListener("message", (event) => {
      if (event.data.type === "currentPos") {
        setIsCurrentPosClicked(true);

        // alert(JSON.stringify(event.data));
        // alert("message received: " + event.data);
      } else if (event.data.type === "addPin") {
        setIsAddPinClicked(true);
        // alert("message received: " + event.data);
      } else if (event.data.type === "submitPinPos") {
        setIsSubmitPinPosClicked(true);
        //alert("message received: " + event.data);
      } else if (event.data.type === "selectWalkway") {
        setWalkwayPath(event.data.path);
        // alert(JSON.stringify(event.data.pins));
        setWalkwayPins(event.data.pins);
        //alert("message received: " + event.data);
      }
    });
  };

  // 각 버튼 클릭시 실행할 것들
  useEffect(() => {
    if (isCurrentPosClicked === true) {
      setIsCurrentPosClicked(false);
      geoLocation();
    }
  }, [isCurrentPosClicked]);
  useEffect(() => {
    if (isSubmitPinPosClicked && isAddPinClicked) {
      handleSubmit("pinPos", state.center);
      setIsSubmitPinPosClicked(false);
      setIsAddPinClicked(false);
    }
  }, [isSubmitPinPosClicked]);
  useEffect(() => {
    if (isSubmitPinPosClicked && isAddPinClicked) {
      handleSubmit("pinPos", state.center);
      setIsSubmitPinPosClicked(false);
      setIsAddPinClicked(false);
    }
  }, [isSubmitPinPosClicked]);
  useEffect(() => {
    if (walkwayPath !== "null") {
      setState({ center: walkwayPath[0] });
      setPathStartPoint(walkwayPath[0]);
    }
  }, [walkwayPath]);
  useEffect(() => {
    if (walkwayPins !== "null") {
      //alert(JSON.stringify(walkwayPins[0].location));
    }
  }, [walkwayPins]);

  // websocket 계속 받기
  useEffect(() => {
    handleReceiveMessage();
    // <GeoLocationMarker setCenter={setCenter} />
  });

  return (
    <div className="preventDrag">
      <Map // 지도를 표시할 Container
        center={
          // 지도의 중심좌표
          state.center
        }
        isPanto={true}
        style={{
          // 지도의 크기
          width: Screen.width,
          height: "100vh",
        }}
        level={4} // 지도의 확대 레벨
        onClick={(_t, mouseEvent) => {
          if (isAddPinClicked) {
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            });
          }
        }}
        onCenterChanged={(map) =>
          setState((prev) => ({
            ...prev,
            center: {
              lat: map.getCenter().getLat(), // 위도
              lng: map.getCenter().getLng(), // 경도
            },
            isLoading: false,
          }))
        }
      >
        {/* 현재 위치 */}
        {/* <GeoLocationMarker setCenter={setCenter} /> */}

        {/* 핀 추가 */}
        {isAddPinClicked && !isSubmitPinPosClicked && (
          <AddMarker position={state.center} />
        )}

        {/* current position */}
        <DrawCurrentPos state={currentState} />

        {/* <DrawMarker posX={currentPosition.lat} posY={currentPosition.lng} /> */}
        <div className="preventMove">
          <DrawPolyline
            path={[walkwayPath !== "null" && walkwayPath]}
            setLine={setLine}
          />
        </div>
        {walkwayPins !== "null" && (
          <DrawMarkers pins={walkwayPins} handleSubmit={handleSubmit} />
        )}
        {/* <DrawMarkers pins={list} /> */}
        {pathStartPoint !== "null" && (
          <DrawStartPoint position={pathStartPoint} />
        )}
        {/* [126.90382463198507,37.53766771249391],[126.90378684196669,37.53779371044991],[126.90360747959478,37.537930260324906],[126.90336570256882,37.538086774921744],[126.90318023041736,37.53827962752207],[126.90293311544221,37.53839555357543],[126.90266002935026,37.538574442097], */}
      </Map>
    </div>
  );
};

export default MapScreen;
