import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import AddMarker from "./AddMarker";
import DrawMarker from "./DrawMarker";
import DrawPolyline from "./DrawPolyline";
const { kakao } = window;

const MapContainer = () => {
  const [position, setPosition] = useState();
  return (
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
      onClick={(_t, mouseEvent) =>
        setPosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        })
      }
    >
      <AddMarker position={position} />
      <DrawMarker posX={37.54699} posY={127.09598} />
      <DrawPolyline
        path={[
          [
            { lat: 33.452344169439975, lng: 126.56878163224233 },
            { lat: 33.452739313807456, lng: 126.5709308145358 },
            { lat: 33.45178067090639, lng: 126.572688693875 },
          ],
        ]}
      />
    </Map>
  );
};

export default MapContainer;
