
import {
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  CHANGE_QUANTITY_REQUEST, CHANGE_QUANTITY_SUCCESS, CHANGE_QUANTITY_FAILURE,
  DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE,
} from '../actionTypes/cart.actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
    case ADD_TO_CART_REQUEST:
    case CHANGE_QUANTITY_REQUEST:
    case DELETE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case CHANGE_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map(item => item._id === action.payload._id ? action.payload : item),
      };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item._id !== action.payload),
      };

    case GET_CART_FAILURE:
    case ADD_TO_CART_FAILURE:
    case CHANGE_QUANTITY_FAILURE:
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
