import axios from 'axios'

export const setLoadNumber = async ( database:string, baseURL:any, id:string|number,created_on:any ) => {
    try {

      console.log(`${baseURL}/fmscs/${database}/sequences/next/tt_load/${id}?date=${created_on}`)
      const {data} = await axios.patch(`${baseURL}/fmscs/${database}/sequences/next/tt_load/${id}?date=${created_on}`)
      return data;
    } 
    catch (err: any) {
      console.log(err.message);
    }
  };
  

 
export const setOrderNumber = async (database:string, baseURL:any, id:string|number,order_date:any ) => {
  try {
    const url = `${baseURL}/fmscs/${database}/sequences/next/tt_order/${id}?date=${order_date}`;
    const { data:{data} } = await axios.patch(url);
    if(data.error){
      throw new Error(data.error.message)
    }
    return data;
  } 
  catch (err: any) {
    console.log(err.message);
  }
};