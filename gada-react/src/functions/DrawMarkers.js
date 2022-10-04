import React from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { boldFontFamily } from "../assets/fonts";
import currentPos from "../constant/images/CurrentPos";
import DefaultPin from "../constant/images/Pins";

const DrawMarkers = ({ pins, setState, isStartWalkClicked }) => {
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
          {isStartWalkClicked && (
            <CustomOverlayMap
              position={item.location}
              yAnchor={0.35}
              xAnchor={-0.7}
            >
              <div>
                <p
                  style={{
                    color: "white",
                    fontFamily: "SpoqaHanSansNeo-Bold",
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  {index + 1}
                </p>
              </div>
            </CustomOverlayMap>
          )}
          <MapMarker
            onClick={() => {
              handleSubmit("clickPin", index);
              {
                isStartWalkClicked &&
                  setState((prev) => ({
                    ...prev,
                    center: {
                      lat: item.location.lat - 0.002,
                      lng: item.location.lng,
                    },
                  }));
              }
            }}
            key={`${item.id}`}
            position={item.location} // 마커를 표시할 위치
            image={{
              src: DefaultPin, // 마커이미지의 주소입니다
              size: {
                width: isStartWalkClicked ? 35 : 20,
                height: isStartWalkClicked ? 35 : 20,
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
