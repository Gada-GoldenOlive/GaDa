import React, { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";

const AddMarker = ({ position }) => {
  return <>{position && <MapMarker position={position} />}</>;
};

export default AddMarker;
