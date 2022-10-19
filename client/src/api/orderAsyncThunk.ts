import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveAs }from 'file-saver';

const baseURL = process.env.REACT_APP_BASEURL as string;
const enviroment = process.env.REACT_APP_ENVIROMENT as string;
const localBaseUrl = enviroment === 'dev' ? 'http://localhost:5000' : baseURL + '/tnt';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async(argsObj: { orderNumber: string, database: string, status: string }) => {
    const { orderNumber, database, status } = argsObj;
    const { data } = await axios.get(`/${database}/orders?order_number=${orderNumber}&status=${status}`, { baseURL: localBaseUrl });
    return data;
});

export const fetchSingleOrder = createAsyncThunk('orders/fetchSingleOrder', async(argsObj: { id: number, database: string }) => {
    const { id, database } = argsObj;
    const { data } = await axios.get(`/${database}/orders/${id}`, { baseURL: localBaseUrl });
    return data;
});

export const postOrder = createAsyncThunk('orders/postOrder', async(argsObj: { orderData: any, database: string }) => {
    const { orderData, database } = argsObj;
    const { data } = await axios.post(`/${database}/orders`, orderData, { baseURL: localBaseUrl });
    return data;
});


export const cancelOrder = createAsyncThunk('orders/cancelOrder', async(argsObj: { id: number, cancelReason: string, database: string }) => {
    const { id, database, cancelReason } = argsObj;
    const { data } = await axios.delete(`/${database}/orders/${id}?cancel_reason=${cancelReason}`, { baseURL: localBaseUrl });
    return data;
});

export const editOrder = createAsyncThunk('orders/editOrder', async(argsObj: { orderData: any, database: string }) => {
    const { orderData, database } = argsObj;
    const { data } = await axios.put(`/${database}/orders/${orderData.id}`, orderData, { baseURL: localBaseUrl });
    return data;
});

// not with async thunk
export const printOrder = async(id: number, orderNumber: string, checked: boolean, database: string) => {
    try{
        const { data } = await axios.get(`/${database}/orders/print/${id}?checked=${checked}`, 
            { responseType: 'blob', baseURL: localBaseUrl });
  
        const pdfBlob = new Blob([data], { type: 'application/pdf' });
        saveAs(pdfBlob, `order_${orderNumber}.pdf`);
    }
    catch(err: any){
      console.log(err);
    }
  }