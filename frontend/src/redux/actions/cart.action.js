import axios from 'axios';
import {
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  CHANGE_QUANTITY_REQUEST, CHANGE_QUANTITY_SUCCESS, CHANGE_QUANTITY_FAILURE,
  DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE,
} from '../actionTypes/cart.actionTypes';

const API = process.env.REACT_APP_API;

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Get cart items
export const getCart = (toast) => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });

  try {
    const res = await api.get('/cart');
    dispatch({ type: GET_CART_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: GET_CART_FAILURE, payload: err.message });
    toast({
      title: 'Failed to load cart',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

// Add item to cart
export const addToCart = (formData, toast) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });

  try {
    const res = await api.post('/cart', formData);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: res.data.cartItem });
    toast({
      title: 'Item added to cart',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: err.message });
    toast({
      title: 'Failed to add item to cart',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

// Change quantity
export const changeQuantity = (id, quantity, toast) => async (dispatch) => {
  dispatch({ type: CHANGE_QUANTITY_REQUEST });

  try {
    const res = await api.put(`/cart?id=${id}`, { quantity });
    dispatch({ type: CHANGE_QUANTITY_SUCCESS, payload: res.data.data });
    toast({
      title: 'Cart updated successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: CHANGE_QUANTITY_FAILURE, payload: err.message });
    toast({
      title: 'Failed to update cart',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

// Delete item from cart
export const deleteItem = (id, toast) => async (dispatch) => {
  dispatch({ type: DELETE_ITEM_REQUEST });

  try {
    await api.delete(`/cart/${id}`);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
    toast({
      title: 'Item deleted from cart',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: DELETE_ITEM_FAILURE, payload: err.message });
    toast({
      title: 'Failed to delete item from cart',
      description: err.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};
