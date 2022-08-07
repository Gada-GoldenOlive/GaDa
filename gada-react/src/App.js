import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import MapContainer from "./functions/MapContainer";
import DrawMarker from "./functions/MapContainer";
const { kakao } = window;

function App() {
  return <MapContainer />;
}

export default App;
