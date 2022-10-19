import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDatasets, fetchUserDetauls, getDefaultCountry } from '../../api/configAsynkThunk';

const initialState: ConfigState = {
    employeeDetails: null,
    datasets: [],
    selectedDataset: 'mwnuk',
    defaultCountry: null
} 

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
       selectDataset: (state, { payload }) => {
        state.selectedDataset = payload;
    },
    },
    extraReducers: {
        [fetchUserDetauls.fulfilled as any]: (state, { payload }) => {
            state.employeeDetails = payload;
        },
        [fetchUserDatasets.fulfilled as any]: (state, { payload }) => {
            if(payload){
                state.selectedDataset = payload?.[0].dset;
                state.datasets = payload;
            }
        },
        [getDefaultCountry.fulfilled as any]: (state, { payload }) => {
            state.defaultCountry = payload;
        },
    }
});

export const { selectDataset } = configSlice.actions;

export const getEmployeeDetails = (state: GlobalState) => state.config.employeeDetails;
export const getConfig = (state: GlobalState) => state.config;

export default configSlice.reducer;