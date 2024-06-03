import axios from 'axios';

import {
  CLEAR_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_LOADING,
  CLEAR_AUTH_LOADING
} from '../actionTypes/auth.actionTypes';

const API=process.env.REACT_APP_API
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
export const register= (userData,toast) => async (dispatch) => {
  dispatch(setAuthLoading());
  try {
    const res = await axios.post(`${API}/user/register`, userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // Store token in local storage
    localStorage.setItem('token', res.data);
    toast({
      title: 'Registration successful.',
      description: 'You have successfully registered.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    dispatch(clearAuthLoading());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    toast({
      title: 'Registration failed.',
      description: err?.response?.data?.message || 'An error occurred.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    dispatch(clearAuthLoading());
  }
};

// Login user action
export const loginUser = (userData,toast) => async (dispatch) => {
  dispatch(setAuthLoading());
  try {
    
    const res = await axios.post(`${API}/user/login`, userData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem('token', res.data);
    toast({
      title: 'Login successful.',
      description: 'You have successfully logged in.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    dispatch(clearAuthLoading());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    toast({
      title: 'Login failed.',
      description: err?.response?.data?.message || 'An error occurred.',
      status: 'error',
      duration: 5000,
      isClosable: true,
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
