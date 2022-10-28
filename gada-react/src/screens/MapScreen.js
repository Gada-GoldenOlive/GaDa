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
  const [isSearchThisPosClicked, setIsSearchThisPosClicked] = useState(false);

  const [movingCurrentList, setMovingCurrentList] = useState();

  const [phoneType, setPhoneType] = useState();

  // const [map, setMap] = useState();
  // const [detailAddress, setDetailAddress] = useState();
  // const geocoder = new window.kakao.maps.services.Geocoder();
  // const handleAddress = () => {
  //   handleSubmit("detailAddress", detailAddress);
  // };
  // const searchAddrFromCoords = (coords, handleAddress) => {
  //   // 좌표로 행정동 주소 정보를 요청합니다
  //   geocoder.coord2RegionCode(coords.lng, coords.lat, (res) =>
  //     setDetailAddress(res)
  //   );
  // };

  useEffect(() => {
    var IorA = navigator.userAgent.toLowerCase();

    if (IorA.indexOf("android") !== -1) {
      // android 일 때
      setPhoneType("android");
    } else if (IorA.indexOf("iphone") !== -1) {
      // iphone 일 때
      setPhoneType("ios");
    }
  }, []);

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
                1000 >
              3
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
            if (!isCurrentPosClicked) {
              handleSubmit("currentPos", {
                lat: position.coords.latitude, // 위도
                lng: position.coords.longitude, // 경도
              });
            } else {
              setIsCurrentPosClicked(false);
            }
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
        },
        {
          enableHighAccuracy: phoneType === "ios" ? true : false,
          accuracy: { ios: "best" },
          timeout: 1000,
          maximumAge: 10000,
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
    // navigator.permissions.query({ name: "geolocation" }).then((result) => {
    //   alert("hi");
    //   if (result.state === "granted") {
    //     geoLocation();
    //   } else if (result.state === "prompt") {
    //     alert("지도를 사용하기 위해서는 위치 권한 허용이 필요합니다.");
    //   }
    //   // Don't do anything if the permission was denied.
    // });
    geoLocation();
  }, []);

  // useEffect(() => {
  //   if (
  //     currentState.center.lat !== null &&
  //     currentState.center.lng !== null &&
  //     isFirstRecording
  //   ) {
  //     // alert("hi");
  //     setRecordPosition([
  //       { lat: currentState.center.lat, lng: currentState.center.lng },
  //     ]);
  //     setIsFirstRecording(false);
  //   }
  // }, [currentState]);

  useEffect(() => {
    if (isGeolocation) {
      setCurrentState(state);
      setIsGeolocation(false);
    }
  }, [isGeolocation]);

  useEffect(() => {
    // setInterval(() => {
    geoLocation("watch");
    // }, 1000);
  });

  const handleCurrentPos = (nowPos) => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: nowPos.lat, // 위도
        lng: nowPos.lng, // 경도
      },
      isLoading: false,
    }));
    setCurrentState((prev) => ({
      ...prev,
      center: {
        lat: nowPos.lat, // 위도
        lng: nowPos.lng, // 경도
      },
      isLoading: false,
    }));
  };
  const handleReceiveMessage = async () => {
    await window.addEventListener("message", (event) => {
      if (event.data.type === "currentPos") {
        setIsCurrentPosClicked(true);

        // handleCurrentPos(event.data.nowPos);

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
      } else if (event.data.type === "locationList") {
        // alert(JSON.stringify(event.data.path.length));
        if (event.data.path.length === 0) {
          setWalkwayPath("null");
          setWalkwayPins("null");
          setPathStartPoint("null");
        } else {
          setWalkwayPath(event.data.path);
          setWalkwayPins("null");
          if (event.data.path.length === 1) {
            setPathStartPoint(event.data.startPoint);
          }
          // setCurrentState({
          //   ...currentState,
          //   center: event.data.nowPos,
          //   isLoading: false,
          // });
        }
      } else if (event.data.type === "isCreate") {
        setWalkwayPath("null");
        setWalkwayPins("null");
        setPathStartPoint("null");
      } else if (event.data.type === "searchThisPos") {
        setIsSearchThisPosClicked(true);
        setWalkwayPath("null");
        setWalkwayPins("null");
        setPathStartPoint("null");
      }
    });
  };

  // 각 버튼 클릭시 실행할 것들
  useEffect(() => {
    if (isSearchThisPosClicked) {
      handleSubmit("searchThisPos", position);
    }
    setIsSearchThisPosClicked(false);
  }, [isSearchThisPosClicked]);
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
    if (isCurrentPosClicked) {
      setIsCurrentPosClicked(false);
    }
  }, [pathStartPoint]);
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
        // onCreate={setMap()}
        onDragEnd={(map) =>
          setState((prev) => ({
            ...prev,
            center: position,
            isLoading: false,
          }))
        }
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
            { lat: 37.52802718259114, lng: 126.9663244284965 },
            { lat: 37.527091086504534, lng: 126.96605238032247 },
            { lat: 37.527998586595615, lng: 126.96651324042868 },
            { lat: 37.527641433097116, lng: 126.96630808416697 },
            { lat: 37.525250275751866, lng: 126.96551819777198 },
            { lat: 37.52796657180441, lng: 126.96649321977006 },
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
