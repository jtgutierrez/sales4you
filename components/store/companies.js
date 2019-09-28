import axios from "axios";
const KEY = "AIzaSyD1SSLqibsgl1qSVWfR-_nUBVJtgcENSuM";

const GET_CLOSEST = "GET_CLOSEST";

const initialState = { loading: true };

const gotClosestCompanies = companies => ({
  type: GET_CLOSEST,
  companies
});

export const getClosestCompanies = location => {
  return async dispatch => {
    try {
      const latitude = location.latitude.toString();
      const longitude = location.longitude.toString();
      let origin = latitude + "," + longitude;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin}&radius=1500&type=clothing_store&keyword=shopping&key=${KEY}`
      );
      let nearby = [];
      for (let i = 0; i < data.results.length; i++) {
        let place = data.results[i];
        let { lat, lng } = place.geometry.location;
        nearby.push({ latitude: lat, longitude: lng, name: place.name });
      }
      dispatch(gotClosestCompanies(nearby));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLOSEST:
      return { ...state, companies: action.companies, loading: false };
    default:
      return state;
  }
}

// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }
