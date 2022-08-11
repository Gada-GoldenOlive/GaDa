import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import AddMarker from "../functions/AddMarker";
import DrawMarker from "../functions/DrawMarker";
import DrawPolyline from "../functions/DrawPolyline";
import GeoLocationMarker from "../functions/GeolocationMarker";

const MapScreen = ({
  currentPosition,
  position,
  handleSubmit,
  setPosition,
}) => {
  const [line, setLine] = useState();
  const [center, setCenter] = useState(currentPosition);
  //console.log(line.getLength());
  const handleReceiveMessage = async () => {
    await window.addEventListener("message", (event) => {
      if (event.data === "currentPos") {
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
    handleReceiveMessage();
  }, []);

  {
    /* TODO 지도 중심 바뀌면 바꿔주기!*/
  }
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: center.lat,
        lng: center.lng,
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
      onCenterChanged={(map) =>
        setCenter({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        })
      }
    >
      <GeoLocationMarker setCenter={setCenter} />
      <AddMarker position={position} />
      {/* current position */}
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
  );
};

export default MapScreen;
