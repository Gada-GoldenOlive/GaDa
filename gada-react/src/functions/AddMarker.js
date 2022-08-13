import React, { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  MapInfoWindow,
  MapMarker,
} from "react-kakao-maps-sdk";
import marker from "../constant/images/marker";
import MovePinText from "../screens/components/MovePinText";

const AddMarker = ({ position }) => {
  return (
    <>
      {position && (
        <div>
          <CustomOverlayMap position={position} yAnchor={3.8} xAnchor={0.5}>
            <div
              style={
                {
                  // position: "absolute",
                  // bottom: 60,
                  // justifyContent: "center",
                }
              }
            >
              <MovePinText />
            </div>
          </CustomOverlayMap>
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
        </div>
      )}
    </>
  );
};

export default AddMarker;
