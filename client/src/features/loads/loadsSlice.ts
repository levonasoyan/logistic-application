import { createSlice } from '@reduxjs/toolkit';
import { cancelLoad, editLoad, fetchLoads, fetchSingleLoad, postLoad } from '../../api/loadAsyncThunk';
import { initLoadSliceState, initPickupDeliveryState } from '../../constants/initStates';

const initialState: LoadState = {
    loads: [],
    selectedLoad: null,
    loadToPost: {
        pickupDetails: initPickupDeliveryState,
        deliveryDetails: initPickupDeliveryState,
        loadDetails: initLoadSliceState,
        fms_shipment_dimentions: []
    },
    loadSuccess: '',
    loadError: ''
} 

const loadsSlice = createSlice({
    name: 'loads',
    initialState,
    reducers: {
        setPickupDetails: (state, { payload }) => {
            state.loadToPost.pickupDetails = payload
        },
        setDeliveryDetails: (state, { payload }) => {
            state.loadToPost.deliveryDetails = payload;
        },
        setLoadDetails: (state, { payload }) => {
            state.loadToPost.loadDetails = payload;
        },
        setShipmentDimentions: (state, { payload }) => {
            state.loadToPost.fms_shipment_dimentions = payload;
        },
        resetErrorAndSuccess: (state) => {
            state.loadSuccess = '';
            state.loadError = '';
        },
        removeClosedLoads: (state, { payload }) => {
            state.loads = state.loads.filter(load => !payload.includes(load.id))
        }
    },
    extraReducers: {
        [fetchLoads.fulfilled]: (state, { payload }) => {
            state.loads = payload;
        },
        [fetchSingleLoad.fulfilled]: (state, { payload }) => {
            state.selectedLoad = payload;
            state.loadToPost.deliveryDetails = payload.load_details.deliveryDetails;
            state.loadToPost.pickupDetails = payload.load_details.pickupDetails;
            state.loadToPost.loadDetails = payload.load_details.loadDetails;
            state.loadToPost.fms_shipment_dimentions = payload.load_details.fms_shipment_dimentions;
            // state.loadToPost.d
        },
        // post a load
        [postLoad.pending]: (state) => {
            state.loadSuccess = '';
            state.loadError = '';
        },
        [postLoad.fulfilled]: (state, { payload }:{ payload: FetchedLoad }) => {
            state.loads.push(payload);
            state.loadSuccess= `Load was created and successfully saved`;
        },
        [postLoad.rejected]: (state) => {
            state.loadError= 'Error while posting the load';
        },
        // delete load
        [cancelLoad.pending]: (state) => {
            state.loadSuccess = '';
            state.loadError = '';
        },
        [cancelLoad.fulfilled]: (state, { payload }) => {
            const newLoads = state.loads.filter(load => load.id !== payload.id);
            state.loads = newLoads;
            state.loadSuccess = 'Load successfully canceledd';
        },
        [cancelLoad.rejected]: (state) => {
            state.loadError = 'Error while canceling the load';
        },
        // edit a load
        [editLoad.pending as any]: (state) => {
            state.loadSuccess = '';
            state.loadError = '';
        },
        [editLoad.fulfilled as any]: (state, { payload } : { payload:FetchedLoad }) => {
            const upDatedLoadIndex = state.loads.findIndex(load => load.id === payload.id);
            state.loads[upDatedLoadIndex] = payload;
            state.loadSuccess = `Load was successfully edited`;
        },
        [editLoad.rejected as any]: (state) => {
            state.loadError = 'Error while editing the load';
        },
    }
});

export const { setPickupDetails, setDeliveryDetails, setLoadDetails, setShipmentDimentions, 
    resetErrorAndSuccess, removeClosedLoads } = loadsSlice.actions;

export const getLoads = (state: GlobalState) => state.loads.loads;
export const getSelectedLoad = (state: GlobalState) => state.loads.selectedLoad;
export const getLoadToPost = (state: GlobalState) => state.loads.loadToPost;
export const getLoadSuccess = (state: GlobalState) => state.loads.loadSuccess;
export const getLoadError = (state: GlobalState) => state.loads.loadError;

export default loadsSlice.reducer;