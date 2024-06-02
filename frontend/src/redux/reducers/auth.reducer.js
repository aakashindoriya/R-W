import {
    SET_USER,
    CLEAR_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_LOADING,
    CLEAR_AUTH_LOADING
  } from '../actionTypes/auth.actionTypes';
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false, // Initial loading state
    error: null,
    token: localStorage.getItem('token'), // Initialize token from local storage
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_LOADING:
        return {
          ...state,
          loading: true,
        };
      case CLEAR_AUTH_LOADING:
        return {
          ...state,
          loading: false,
        };
      case SET_USER:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case CLEAR_USER:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          loading: false,
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          error: null,
          token: action.payload.token,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
          token: null,
        };
      case AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  