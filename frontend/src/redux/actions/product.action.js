import axios from 'axios';
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../actionTypes/product.actionTypes';
const API=process.env.REACT_APP_API
export const getProducts = (search) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  try {
    let res
    if(search){

       res = await axios.get(`${API}/product?search=${search}`);
    }else{
       res = await axios.get(`${API}/product`);

    }
    
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PRODUCTS_FAILURE, payload: err.response.data });
  }
};


