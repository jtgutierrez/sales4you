import axios from "axios";
const KEY = "AIzaSyD1SSLqibsgl1qSVWfR-_nUBVJtgcENSuM";

var origin;
var destination;

const GET_DISTANCE = "GET_DISTANCE";

const initialState = {
  miles: "",
  time: ""
};

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

      const miles = data.rows[0].elements[0].distance.text;
      const time = data.rows[0].elements[0].duration.text;
      dispatch(gotDistance({ miles, time }));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DISTANCE:
      return {
        ...state,
        miles: action.distance.miles,
        time: action.distance.time
      };
    default:
      return state;
  }
}
