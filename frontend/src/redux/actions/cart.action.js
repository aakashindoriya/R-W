import axios from 'axios';
import {
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  CHANGE_QUANTITY_REQUEST, CHANGE_QUANTITY_SUCCESS, CHANGE_QUANTITY_FAILURE,
  DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE,
} from '../actionTypes/cart.actionTypes';

// Get cart items
const API=process.env.REACT_APP_API
export const getCart = (toast) => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });

  try {
    const res = await axios.get(`${API}/cart`);
    console.log(res,"getcart")
    dispatch({ type: GET_CART_SUCCESS, payload: res.data.data });

  } catch (err) {
    dispatch({ type: GET_CART_FAILURE, payload: err.response.data });
    toast({
      title: 'Failed to load cart',
      description: err.response.data,
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
    const res = await axios.post(`${API}/cart`, formData);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: res.data.cartItem });
    toast({
      title: 'Item added to cart',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: err.response.data });
    toast({
      title: 'Failed to add item to cart',
      description: err.response.data,
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
    const res = await axios.put(`${API}/cart?id=${id}`, { quantity });
    dispatch({ type: CHANGE_QUANTITY_SUCCESS, payload: res.data.data });
    toast({
      title: 'Cart updated successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: CHANGE_QUANTITY_FAILURE, payload: err.response.data });
    toast({
      title: 'Failed to update cart',
      description: err.response.data,
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
    await axios.delete(`${API}/cart/${id}`);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
    toast({
      title: 'Item deleted from cart',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (err) {
    dispatch({ type: DELETE_ITEM_FAILURE, payload: err.response.data });
    toast({
      title: 'Failed to delete item from cart',
      description: err.response.data,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

