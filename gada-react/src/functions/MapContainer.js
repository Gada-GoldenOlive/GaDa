import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import AddMarker from "./AddMarker";
import DrawMarker from "./DrawMarker";
import DrawPolyline from "./DrawPolyline";

const { kakao } = window;

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState("");
  const [position, setPosition] = useState();

  //const wsTmp = new WebSocket(`wss://4e45-110-8-134-126.jp.ngrok.io:3000/ws`);
  //console.log(wsTmp);

  useEffect(() => {
    console.log("되나?");
    //console.log(position);
    window.addEventListener("message", (event) => {
      //const { data, type } = JSON.parse(event);

      // console.log(event);
      // console.log("받은 데이터");
      // return <p>dddd</p>;
      // console.log(event.data);
      //setPosition(event);
      //console.log(event.data);
      // if (event.data[0] === 3) {
      //   setCurrentPosition("들어와?");
      setCurrentPosition({
        lat: Number(event.data.split(",")[0]),
        lng: Number(event.data.split(",")[1]),
      });
      // }
      //alert("message received: " + event.data[0]);
    });
  }, []);

  // window.addEventListener("message", (event) => {
  //   //const { data, type } = JSON.parse(event.data);
  //   console.log(event);
  //   console.log("받은 데이터2");
  //   setPosition(event);
  //   // console.log(event.data);
  //   // setCurrentPosition(data);
  // });

  const handleSubmit = (position) => {
    //console.log(position);
    if (window.ReactNativeWebView) {
      console.log("클릭");
      window.ReactNativeWebView.postMessage(JSON.stringify(position));
    }
  };

  alert("현재 위치: " + currentPosition.lat + currentPosition.lng);
  return (
    <>
      {/* <div style={{ marginTop: 60 }}></div>
      <p>하이</p>
      <p>{position}</p> */}
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 37.54699,
          lng: 127.09598,
        }}
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
      >
        <AddMarker position={position} />
        <DrawMarker posX={currentPosition.lat} posY={currentPosition.lng} />
        <DrawPolyline
          path={[
            [
              { lat: 33.452344169439975, lng: 126.56878163224233 },
              { lat: 33.452739313807456, lng: 126.5709308145358 },
              { lat: 33.45178067090639, lng: 126.572688693875 },
            ],
          ]}
        />

        <button
          style={{
            position: "absolute",
            right: 600,
            top: 300,
            backgroundColor: "red",
            width: 100,
            height: 100,
            zIndex: 100,
          }}
          onClick={handleSubmit}
        >
          submit
        </button>
      </Map>
    </>
  );
};

export default MapContainer;
