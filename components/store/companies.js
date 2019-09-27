import axios from "axios";

const GET_CLOSEST = "GET_CLOSEST";

const initialState = {};

const gotClosestCompanies = companies => ({
  type: GET_CLOSEST,
  companies
});

export const getClosestCompanies = () => async dispatch => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/companies");
    dispatch(gotClosestCompanies(data));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLOSEST:
      return action.companies;
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
