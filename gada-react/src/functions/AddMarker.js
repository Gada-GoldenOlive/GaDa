import React, { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import marker from "../constant/images/marker";

const AddMarker = ({ position }) => {
  return (
    <>
      {position && (
        <MapMarker
          position={position}
          image={{
            src: marker,
            size: {
              width: 49,
              height: 60,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      )}
    </>
  );
};

export default AddMarker;
