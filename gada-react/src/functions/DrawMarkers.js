import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import currentPos from "../constant/images/CurrentPos";
import DefaultPin from "../constant/images/Pins";

const DrawMarkers = ({ pins }) => {
  return (
    <div>
      {pins.map((item, index) => (
        <div style={{ backgroundColor: "red" }}>
          <MapMarker
            key={`${item.id}`}
            position={item.location} // 마커를 표시할 위치
            image={{
              src: DefaultPin, // 마커이미지의 주소입니다
              size: {
                width: 15,
                height: 15,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 5,
                  y: 5,
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
