import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import currentPos from "../constant/images/CurrentPos";
import marker from "../constant/images/marker";

const GeoLocationMarker = ({ setCenter }) => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          });
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

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
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        >
          <div style={{ padding: "5px", color: "#000" }}>
            {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
          </div>
        </MapMarker>
      )}
    </>
  );
};

export default GeoLocationMarker;
