import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

let baseURL = process.env.REACT_APP_BASEURL as string;
const enviroment = process.env.REACT_APP_ENVIROMENT as string;
const loginInput = document.getElementById('login') as HTMLInputElement;
const login = enviroment === 'dev' ? 'aghajanyan' : loginInput.value;
const apiKey = process.env.REACT_APP_X_API_KEY as string;


axios.interceptors.request.use(config => {
    if(enviroment === 'dev'){
        config.headers!['X-API-KEY'] = apiKey;
    }
    return config
});


export const fetchUserDetauls = createAsyncThunk('config/fetchUserDetauls', async(database: string) => {
    const { data } = await axios.get( `/us/${database}/usrs/${login}`, { baseURL });
    return data.data;
});

export const fetchUserDatasets = createAsyncThunk('config/fetchUserDatasets', async() => {
    const { data } = await axios.get( `/us/null/dsets/${login}`, { baseURL });
    return data.data.data;
});

export const getDefaultCountry = createAsyncThunk('config/getDefaultCountry', async(database: string) => {
    const { data } = await axios.get( `/cfgs/${database}/country`, { baseURL });
    return data.data;
});
