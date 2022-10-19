import { configureStore } from '@reduxjs/toolkit';
import loadsReducer from './loads/loadsSlice';
import ordersReducer from './orders/ordersSlice';
import configReducer from './config/configSlice';


export const store = configureStore({
    reducer: {
        loads: loadsReducer,
        orders: ordersReducer,
        config: configReducer
    }
});