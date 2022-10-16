import React, { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
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
import { getDistance } from "geolib";
import AddPin from "../constant/images/AddPin";
import { getDistanceFromLatLonInKm } from "../functions";

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
  const [isStartWalkClicked, setIsStartWalkClicked] = useState(false);
  const [recordPosition, setRecordPosition] = useState([]);
  //console.log(line.getLength());
  let timer;
  const handlePolylineDrag = (map) => {
    setPosition({
      lat: map.getCenter().getLat(), // 위도
      lng: map.getCenter().getLng(), // 경도
    });
  };

  const [state, setState] = useState({
    center: {
      lat: null,
      lng: null,
    },
    errMsg: null,
    isLoading: true,
  });
  const [currentState, setCurrentState] = useState(state);
  const [walkwayPath, setWalkwayPath] = useState("null");
  const [walkwayPins, setWalkwayPins] = useState("null");
  const [pathStartPoint, setPathStartPoint] = useState("null");
  const [isFirstRecording, setIsFirstRecording] = useState(true);

  const [movingCurrentList, setMovingCurrentList] = useState();

  const [map, setMap] = useState();
  const [detailAddress, setDetailAddress] = useState();
  const geocoder = new window.kakao.maps.services.Geocoder();
  const handleAddress = () => {
    handleSubmit("detailAddress", detailAddress);
  };
  const searchAddrFromCoords = (coords, handleAddress) => {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.lng, coords.lat, (res) => {
      setDetailAddress(res);
      alert(coords);
    });
  };

  const geoLocation = (ver = "null") => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (ver === "watch") {
            // 현재 위치 표시를 위해 그냥 currentState 저장만
            const center = {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            };
            if (
              getDistanceFromLatLonInKm({
                lat1: currentState.center.lat,
                lng1: currentState.center.lng,
                lat2: center.lat,
                lng2: center.lng,
              }) *
                1000 <
              10
            )
              setCurrentState((prev) => ({
                ...prev,
                center: {
                  lat: position.coords.latitude, // 위도
                  lng: position.coords.longitude, // 경도
                },
                isLoading: false,
              }));
          } else {
            // 현재 위치 저장 및 현재 위치로 이동하도록
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
          }
        },
        (err) => {
          if (ver === "watch") {
            setCurrentState((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
          }
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
    searchAddrFromCoords(
      { lat: 37.52808864250951, lng: 126.9664946472026 },
      (res) => alert(res)
    );
  }, []);

  useEffect(() => {
    if (
      currentState.center.lat !== null &&
      currentState.center.lng !== null &&
      isFirstRecording
    ) {
      // alert("hi");
      setRecordPosition([
        { lat: currentState.center.lat, lng: currentState.center.lng },
      ]);
      setIsFirstRecording(false);
    }
  }, [currentState]);

  useEffect(() => {
    if (isGeolocation) {
      setCurrentState(state);
      setIsGeolocation(false);
    }
  }, [isGeolocation]);

  useEffect(() => {
    setInterval(() => {
      geoLocation("watch");
    }, 5000);
  });

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
        setPathStartPoint(event.data.startPoint);
        //alert("message received: " + event.data);
      } else if (event.data.type === "startWalk") {
        setIsStartWalkClicked(true);
      } else if (event.data.type === "stopWalk") {
        setIsStartWalkClicked(false);
      } else if (event.data.type === "restartWalkway") {
        setWalkwayPath(event.data.path);
        setWalkwayPins(event.data.pins);
        setPathStartPoint(event.data.startPoint);
      } else if (event.data.type === "detailAddress") {
        alert("hi");
        searchAddrFromCoords(event.data.coords, handleAddress);
      }
    });
  };
  useEffect(() => {
    // alert(JSON.stringify(walkwayPath));
  }, [walkwayPath]);

  // 각 버튼 클릭시 실행할 것들
  useEffect(() => {
    if (isCurrentPosClicked === true) {
      geoLocation();
    }
  }, [isCurrentPosClicked]);
  useEffect(() => {
    if (isSubmitPinPosClicked && isAddPinClicked) {
      handleSubmit("pinPos", position);
      setIsSubmitPinPosClicked(false);
      setIsAddPinClicked(false);
    }
  }, [isSubmitPinPosClicked]);

  useEffect(() => {
    if (
      walkwayPath !== "null" &&
      pathStartPoint !== "null" &&
      !isCurrentPosClicked
    ) {
      setState((prev) => ({ ...prev, center: pathStartPoint }));
    }
    setIsCurrentPosClicked(false);
  }, [walkwayPath, pathStartPoint]);
  useEffect(() => {
    if (isStartWalkClicked === true) {
      setState((prev) => ({ ...prev, center: pathStartPoint }));
      //setIsStartWalkClicked(false);
    }
  }, [isStartWalkClicked]);

  // websocket 계속 받기
  useEffect(() => {
    handleReceiveMessage();
    // <GeoLocationMarker setCenter={setCenter} />
  });

  // alert(JSON.stringify(Screen.width));
  return (
    <div id="map" className="preventDrag">
      <Map // 지도를 표시할 Container
        center={
          // 지도의 중심좌표
          state.center
          // {
          //   lat: 33.452344169439975,
          //   lng: 126.56878163224233,
          // }
        }
        isPanto={true}
        style={{
          // 지도의 크기
          width: Screen.width * 5,
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
        // onTileLoaded={(map) => handlePolylineDrag(map)}
        onCenterChanged={(map) => handlePolylineDrag(map)}
        // onRightClick={(map) => <DrawPolylineFromKakao map={map} />}
        onCreate={setMap()}
      >
        {/* 현재 위치 */}
        {/* <GeoLocationMarker setCenter={setCenter} /> */}

        {/* 핀 추가 */}
        {isAddPinClicked && !isSubmitPinPosClicked && (
          /* <AddMarker position={position} /> */
          <div
            style={{
              position: "absolute",
              right: "15vh",
              top: "36.5vh",
              zIndex: 700,
              width: "148px",
              height: "110px",

              backgroundImage: `url(${AddPin})`,
              backgroundSize: "cover",
            }}
          />
        )}

        {/* current position */}
        <DrawCurrentPos state={currentState} />

        {walkwayPath !== "null" && (
          <DrawPolyline
            path={walkwayPath}
            // setLine={setLine}
          />
        )}
        {/* <DrawPolyline
          path={[
            { lat: 37.52808864250951, lng: 126.9664946472026 },
            { lat: 37.528100946217506, lng: 126.96620814543589 },
            { lat: 37.52810757753854, lng: 126.96644342188938 },
          ]}
        /> */}
        {/* </div> */}
        {walkwayPins !== "null" && (
          <DrawMarkers
            pins={walkwayPins}
            handleSubmit={handleSubmit}
            setState={setState}
            isStartWalkClicked={isStartWalkClicked}
          />
        )}
        {/* <DrawMarkers pins={list} /> */}
        {pathStartPoint !== "null" && (
          <DrawStartPoint position={pathStartPoint} />
        )}
      </Map>
    </div>
  );
};

export default MapScreen;
