import React, { useEffect, useState } from "react";
import MovePinText from "../screens/components/MovePinText";
import MapScreen from "../screens/MapScreen";
import GeoLocationMarker from "./GeolocationMarker";

const { kakao } = window;

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState({
    // 지도의 중심좌표
    lat: 37.54699,
    lng: 127.09598,
  });
  const [position, setPosition] = useState();
  const [isCurrentPosClicked, setIsCurrentPosClicked] = useState(false);
  //const [center, setCenter] = useState();

  //const wsTmp = new WebSocket(`wss://4e45-110-8-134-126.jp.ngrok.io:3000/ws`);
  //console.log(wsTmp);

  const handleReceiveMessage = async () => {
    await window.addEventListener("message", (event) => {
      if (event.data === "currentPos") {
        setIsCurrentPosClicked(true);
        alert("message received: " + event.data);
      }
      // if (event.data[0] === "3") {
      //   setCurrentPosition({
      //     lat: Number(event.data.split(",")[0]),
      //     lng: Number(event.data.split(",")[1]),
      //   });
      // }
      // }
      //alert("message received: " + event.data[0]);
    });
  };
  useEffect(() => {
    console.log("되나?");
    //handleReceiveMessage();
    //console.log(position);

    //const { data, type } = JSON.parse(event);

    // console.log(event);
    // console.log("받은 데이터");
    // return <p>dddd</p>;
    // console.log(event.data);
    //setPosition(event);
    //console.log(event.data);
    // if (event.data[0] === 3) {
    //   setCurrentPosition("들어와?");
  }, []);

  // window.addEventListener("message", (event) => {
  //   //const { data, type } = JSON.parse(event.data);
  //   console.log(event);
  //   console.log("받은 데이터2");
  //   setPosition(event);
  //   // console.log(event.data);
  //   // setCurrentPosition(data);
  // });

  const handleSubmit = (ver, position) => {
    //console.log(position);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        ver + "@" + JSON.stringify(position)
      );
    }
  };

  //alert("현재 위치: " + currentPosition.lat + currentPosition.lng);
  return (
    <MapScreen
      currentPosition={currentPosition}
      position={position}
      handleSubmit={handleSubmit}
      setPosition={setPosition}
      //isCurrentPosClicked={isCurrentPosClicked}
      // center={center}
      // setCenter={setCenter}
    />
    // <MovePinText />
  );
};

export default MapContainer;
