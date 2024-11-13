// reducers/productReducer.ts
import { Dispatch } from '@reduxjs/toolkit';
import { ProductState, ProductActionTypes, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../../types';
import { fetchProductsApi } from '../../services/productService';

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export function fetchProductAction(token: string) {
    return async (dispatch: Dispatch<ProductActionTypes>) => {
        dispatch({
            type: FETCH_PRODUCTS_REQUEST,
        });
        try {
            const resp = await fetchProductsApi(token); 

            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: resp.data?.products,
            });

            return resp;

        } catch (error) {
            dispatch({
                type: FETCH_PRODUCTS_FAILURE,
                payload: 'Error fetching products',
            });
        }
    };
}

export const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default productReducer;