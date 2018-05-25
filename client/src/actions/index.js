//first action creater
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () =>
  // const requst = axios.get('/api/current_user');

  // return {
  //   type: FETCH_USER,
  //   payload: request
  // };
  //Abve is the usual to return action immediatelly.
  //now we want to use redux thunk to dispatch action manually.

  //if redux thunk see the return as a function instead of normal action
  //it will automatically add dispatch function as argument to this function.
  //in index.js we add redux thunk function const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
  //whichi is middleware to inspect the value we return from the action creator
  //this is a action creator
  async dispatch => {
    const res = await axios.get('/api/current_user');
    //the whole point here is that we want to dispatch our application
    //after the get API request has been completed
    //dispatch is a callback async function
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
    //once get API finished, get res retrun obj, call dispatch to return action obj.
  };
