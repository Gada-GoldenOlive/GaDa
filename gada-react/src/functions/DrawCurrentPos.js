import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import currentPos from "../constant/images/CurrentPos";

export default function DrawCurrentPos({ state }) {
  return (
    <>
      {!state.isLoading && (
        <MapMarker
          position={state.center}
          image={{
            src: currentPos,
            size: {
              width: 50,
              height: 50,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 25,
                y: 30,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        >
          {/* <div style={{ padding: "5px", color: "#000" }}>
            {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
          </div> */}
        </MapMarker>
      )}
    </>
  );
}
