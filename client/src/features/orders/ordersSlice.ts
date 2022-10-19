import { createSlice } from '@reduxjs/toolkit';
import { cancelOrder, editOrder, fetchOrders, fetchSingleOrder, postOrder } from '../../api/orderAsyncThunk';
import { initOrderSliceState, initOrderState } from '../../constants/initStates';


const initialState: OrderState = {
    orders: [],
    selectedOrder: null,
    orderToPost: {
        orderDetails: initOrderSliceState,
        loadIdList: []
    },
    orderSuccess: '',
    orderError: '',
    showOrders: false,
    orderDetailsState: initOrderState
} 

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrderDetails: (state, { payload }) => {
            state.orderToPost.orderDetails = payload
        },
        setLoadIdList: (state, { payload }) => {
            state.orderToPost.loadIdList = payload;
        },
        resetErrorAndSuccess: (state) => {
            state.orderSuccess = '';
            state.orderError = '';
        },
        setShowOrders: (state, { payload }) => {
            state.showOrders = payload
        },
        resetSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
        setOrderDetailsSliceState: (state, { payload }) => {
            state.orderDetailsState = payload
        },
    },
    extraReducers: {
        [fetchOrders.fulfilled as any]: (state, { payload }) => {
            state.orders = payload;
        },
        [fetchSingleOrder.fulfilled as any]: (state, { payload }) => {
            state.selectedOrder = payload;
            const idList = payload.loads.map((load: FetchedLoad) => load.id);
            state.orderToPost.loadIdList = idList;
        },
        // post an order
        [postOrder.pending as any]: (state) => {
            state.orderSuccess = '';
            state.orderError = '';
        },
        [postOrder.fulfilled as any]: (state, { payload }:{ payload: FetchedOrder }) => {
            state.orders.push(payload);
            state.orderToPost.loadIdList = [];
            state.orderToPost.orderDetails = initOrderSliceState;
            state.orderSuccess = `Order was created and successfully saved`;
        },
        [postOrder.rejected as any]: (state) => {
            state.orderError = 'Error while posting the order';
        },
        // delete order
        [cancelOrder.pending as any]: (state) => {
            state.orderSuccess = '';
            state.orderError = '';
        },
        [cancelOrder.fulfilled as any]: (state, { payload }) => {
            const newOrders = state.orders.filter(order => order.id !== payload.id);
            state.orders = newOrders;
            state.orderSuccess = 'Order successfully canceled';
        },
        [cancelOrder.rejected as any]: (state) => {
            state.orderError = 'Error while canceling the order';
        },
        // edit a order
        [editOrder.pending as any]: (state) => {
            state.orderSuccess = '';
            state.orderError = '';
        },
        [editOrder.fulfilled as any]: (state, { payload }: { payload:FetchedOrder }) => {
            const updatedOrderIndex = state.orders.findIndex(order => order.id === payload.id);
            state.orders[updatedOrderIndex] = payload;
            state.orderSuccess = `Order was successfully edited`;
        },
        [editOrder.rejected as any]: (state) => {
            state.orderError = 'Error while editing the order';
        },
    } 
});

export const { setOrderDetails, setLoadIdList, resetErrorAndSuccess, setShowOrders, resetSelectedOrder, setOrderDetailsSliceState } = ordersSlice.actions;

export const getOrders = (state: GlobalState) => state.orders.orders;
export const getSelectedOrder = (state: GlobalState) => state.orders.selectedOrder;
export const getOrderToPost = (state: GlobalState) => state.orders.orderToPost;
export const getOrderSuccessStatus = (state: GlobalState) => state.orders.orderSuccess;
export const getOrderErrorStatus = (state: GlobalState) => state.orders.orderError;
export const getshowOrders = (state: GlobalState) => state.orders.showOrders;
export const getOrderDetailsState = (state: GlobalState) => state.orders.orderDetailsState;


export default ordersSlice.reducer;