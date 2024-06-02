import axios from 'axios';
const API=process.env("REACT_APP_API")
import {
  CLEAR_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_LOADING,
  CLEAR_AUTH_LOADING
} from './actionTypes';


// Clear user action
export const clearUser = () => ({
  type: CLEAR_USER,
});

// Set loading action
export const setAuthLoading = () => ({
  type: AUTH_LOADING,
});

// Clear loading action
export const clearAuthLoading = () => ({
  type: CLEAR_AUTH_LOADING,
});

// Register user action
export const registerUser = (userData) => async (dispatch) => {
  dispatch(setAuthLoading());
  try {
    const res = await axios.post(`${API}/user/register`, userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // Store token in local storage
    localStorage.setItem('token', res.data);
    dispatch(clearAuthLoading());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    dispatch(clearAuthLoading());
  }
};

// Login user action
export const loginUser = (userData) => async (dispatch) => {
  dispatch(setAuthLoading());
  try {
    const res = await axios.post(`${API}/user/login`, userData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem('token', res.data.token);
    dispatch(clearAuthLoading());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    dispatch(clearAuthLoading());
  }
};

// Logout user action
export const logoutUser = () => async (dispatch) => {
  dispatch(setAuthLoading());
  try {
    
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem('token');
    dispatch(clearAuthLoading());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    dispatch(clearAuthLoading());
  }
};
