import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import StartPoint from "../constant/images/StartPoint";

const DrawStartPoint = ({ position }) => {
  return (
    <MapMarker // 마커를 생성합니다
      position={position}
      image={{
        src: StartPoint,
        size: {
          width: 46,
          height: 55,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 23,
            y: 55 - 11,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
    />
  );
};

export default DrawStartPoint;
