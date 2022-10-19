import axios from "axios";

const enviroment = process.env.REACT_APP_ENVIROMENT as string;
const baseURL = process.env.REACT_APP_BASEURL as string;
const localBaseUrl = enviroment === 'dev' ? 'http://localhost:5000' : baseURL + '/tnt';


export const getCountries = async (database: string) => {
  try {
    const { data } = await axios.get( `/${database}/other/countries`, { baseURL: localBaseUrl });
    return data;
  } 
  catch (err) {
    console.log(err);
  }
};

export const getShippers = async (name: string, database: string) => {
  try {
    const { data } = await axios.get( `/${database}/other/shippers?name=${name}`, { baseURL: localBaseUrl });
    return data;
  } 
  catch (err) {
    console.log(err);
  }
};

export const getHauliers = async (name: string, database: string) => {
  try {
    const { data } = await axios.get( `/${database}/other/vendors?name=${name}`, { baseURL: localBaseUrl });
    return data;
  } 
  catch (err) {
    console.log(err);
  }
};

export const getLoadIdViaJobNumber = async(jobNumber: string, database: string) => {
  try {
    const { data } = await axios.get( `/${database}/loads/0?job_number=${jobNumber}`, { baseURL: localBaseUrl });
    return data;
  } 
  catch (err) {
    console.log(err);
  }
}

export const getCurrencies = async (database: string) => {
  try {
    const { data } = await axios.get( `/${database}/other/currencies`, { baseURL: localBaseUrl });
    return data;
  } 
  catch (err) {
    console.log(err);
  }
};


