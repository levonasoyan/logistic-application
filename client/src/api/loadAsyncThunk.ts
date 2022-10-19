import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = process.env.REACT_APP_BASEURL as string;
const enviroment = process.env.REACT_APP_ENVIROMENT as string;
const localBaseUrl = enviroment === 'dev' ? 'http://localhost:5000' : baseURL + '/tnt';

export const fetchLoads: any = createAsyncThunk('loads/fetchLoads', 
    async(filter: { status: string, jobNumber: string, consignee_id: number, shipper_id: number, database: string }) => {
    
    const { status, jobNumber, consignee_id, shipper_id, database } = filter;
    const url = `/${database}/loads?status=${status}&job_number=${jobNumber}&consignee_id=${consignee_id || ''}&shipper_id=${shipper_id || ''}`;
    const { data } = await axios.get(url, { baseURL: localBaseUrl });
    return data;
});

export const fetchSingleLoad: any = createAsyncThunk('loads/fetchSingleLoad', async(args: { id: number, database: string }) => {
    const { database, id } = args;
    const { data } = await axios.get(`/${database}/loads/${id}`, { baseURL: localBaseUrl });
    return data;
});

export const postLoad: any = createAsyncThunk('loads/postLoad', async(args: { loadData: LoadState, database: string }) => {
    const { loadData, database } = args;
    const { data } = await axios.post(`/${database}/loads`, loadData, { baseURL: localBaseUrl });
    return data;
});

export const cancelLoad: any = createAsyncThunk('loads/cancelLoad', async(args: { id: number, cancelReason: string, database: string }) => {
    const { database, cancelReason, id } = args;
    const { data } = await axios.delete(`/${database}/loads/${id}?cancel_reason=${cancelReason}`, { baseURL: localBaseUrl });
    return data;
});

export const editLoad = createAsyncThunk('loads/editLoad', async(loadToEdit: { id: number, loadData: any, database: string }) => {
    const { id, loadData, database } = loadToEdit;
    const { data } = await axios.put(`/${database}/loads/${id}`, loadData, { baseURL: localBaseUrl });
    return data;
});