import React, { Component } from 'react';
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyCMUqtGsbaAiToKrHo6WvheW7-7gB3PDmY"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
