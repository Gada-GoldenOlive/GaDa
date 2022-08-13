import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import AddMarker from "../functions/AddMarker";
import DrawCurrentPos from "../functions/DrawCurrentPos";
import DrawMarker from "../functions/DrawMarker";
import DrawPolyline from "../functions/DrawPolyline";
import GeoLocationMarker from "../functions/GeolocationMarker";
import MovePinText from "./components/MovePinText";

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
  }, []);

  useEffect(() => {
    if (isGeolocation) {
      setCurrentState(state);
      setIsGeolocation(false);
    }
  }, [isGeolocation]);

  const handleReceiveMessage = async () => {
    await window.addEventListener("message", (event) => {
      if (event.data === "currentPos") {
        setIsCurrentPosClicked(true);
        // alert("message received: " + event.data);
      } else if (event.data === "addPin") {
        //setIsCurrentPosClicked(true);
        // alert("message received: " + event.data);
      }
    });
  };

  useEffect(() => {
    if (isCurrentPosClicked === true) {
      //alert('클릭됨');
      setIsCurrentPosClicked(false);
      {
        /* 현재 위치 */
      }
      geoLocation();
      //setCurrentState(state);
      // <GeoLocationMarker setCenter={setCenter}/>
    }
  }, [isCurrentPosClicked]);

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
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
          handleSubmit(position);
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
        <div>
          hi
          <MovePinText />
          <AddMarker position={position} />
        </div>

        {/* current position */}
        <DrawCurrentPos state={currentState} />
        {/* <DrawMarker posX={currentPosition.lat} posY={currentPosition.lng} /> */}
        <DrawPolyline
          path={[
            [
              { lat: 37.5351787566412, lng: 126.90313420225422 },
              { lat: 37.5367288255216, lng: 126.90442351809145 },
              { lat: 37.53686544779613, lng: 126.904258307496 },

              { lat: 37.53710837379388, lng: 126.90417148286825 },
              { lat: 37.53732658502673, lng: 126.9040990030548 },

              { lat: 37.53738716655828, lng: 126.90404758556996 },
              { lat: 37.53745509339161, lng: 126.90411212912906 },
              { lat: 37.53746494883995, lng: 126.90427900574636 },
              { lat: 37.537608987470044, lng: 126.90424390281818 },
              { lat: 37.537703211212765, lng: 126.90416109026054 },
              { lat: 37.53775902917459, lng: 126.90405877483371 },
              { lat: 37.53779011809602, lng: 126.90396797513036 },
            ],
          ]}
          setLine={setLine}
        />
        {/* [126.90382463198507,37.53766771249391],[126.90378684196669,37.53779371044991],[126.90360747959478,37.537930260324906],[126.90336570256882,37.538086774921744],[126.90318023041736,37.53827962752207],[126.90293311544221,37.53839555357543],[126.90266002935026,37.538574442097], */}
      </Map>
    </div>
  );
};

export default MapScreen;
