import axios from "axios";
const KEY = "AIzaSyD1SSLqibsgl1qSVWfR-_nUBVJtgcENSuM";

var origin;
var destination;

const GET_DISTANCE = "GET_DISTANCE";

const initialState = {};

const gotDistance = distance => ({
  type: GET_DISTANCE,
  distance
});

export const getDistanceThunkCreator = (marker, myLoc) => {
  return async dispatch => {
    try {
      const latitude = marker.latitude.toString();
      const longitude = marker.longitude.toString();
      origin = latitude + "," + longitude;
      const myLat = myLoc.myLocation.latitude.toString();
      const myLong = myLoc.myLocation.longitude.toString();
      destination = myLat + "," + myLong;

      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=walking&origins=${origin}&destinations=${destination}&key=${KEY}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
