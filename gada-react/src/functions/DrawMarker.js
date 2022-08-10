import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import currentPos from "../constant/images/CurrentPos";

const DrawMarker = ({ posX, posY }) => {
  return (
    <MapMarker // 마커를 생성합니다
      position={{
        // 마커가 표시될 위치입니다
        lat: posX,
        lng: posY,
      }}
      image={{
        src: currentPos,
        size: {
          width: 64,
          height: 69,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 27,
            y: 69,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
    />
  );
};

export default DrawMarker;
