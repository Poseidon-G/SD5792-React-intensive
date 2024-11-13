// reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
