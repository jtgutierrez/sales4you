import axios from "axios";
const distance = require("google-distance-matrix");

var origin;
var destination;
distance.key("AIzaSyD1SSLqibsgl1qSVWfR-_nUBVJtgcENSuM");
distance.units("imperial");

const GET_DISTANCE = "GET_DISTANCE";

const initialState = {};

const gotDistance = distance => ({
  type: GET_DISTANCE,
  distance
});

export const getDistanceThunkCreator = (marker, myLocation) => {
  return async dispatch => {
    try {
      const latitude = marker.latitude.toString();
      const longitude = marker.longitude.toString();
      origin = [latitude + longitude];
      const myLat = myLocation.latitude.toString();
      const myLong = myLocation.longitude.toString();
      destination = [myLat + myLong];

      distance.matrix(origin, destination, function(err, distance) {
        if (err) {
          return console.log(err);
        }

        console.log(distance);
      });

      console.log(data);
    } catch (error) {}
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DISTANCE:
      return action.distance;
    default:
      return state;
  }
}
