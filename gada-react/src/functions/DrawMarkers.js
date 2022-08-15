import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import currentPos from "../constant/images/CurrentPos";
import DefaultPin from "../constant/images/Pins";

const DrawMarkers = ({ pins, setState }) => {
  const handleSubmit = (ver, data) => {
    //console.log(position);
    const msg = {
      type: ver,
      index: data,
    };
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    }
  };

  return (
    <div>
      {pins.map((item, index) => (
        <div>
          <MapMarker
            onClick={() => {
              handleSubmit("clickPin", index);
              setState((prev) => ({
                ...prev,
                center: {
                  lat: item.location.lat - 0.0005,
                  lng: item.location.lng,
                },
              }));
            }}
            key={`${item.id}`}
            position={item.location} // 마커를 표시할 위치
            image={{
              src: DefaultPin, // 마커이미지의 주소입니다
              size: {
                width: 20,
                height: 20,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 8,
                  y: 8,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DrawMarkers;
