import React, { useState } from 'react'
import { fetchOrders } from "../../api/orderAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { getshowOrders} from "../../features/orders/ordersSlice";
import { fetchLoads } from "../../api/loadAsyncThunk";
import HomeFilterSelect from './HomeFilterSelect/HomeFilterSelect';
import { getConfig } from './../../features/config/configSlice';
import { defaultLoadsFilter } from '../../pages/Home';

interface HomeFilterFormProps {
    loadsFilter: typeof defaultLoadsFilter,
    setLoadsFilter: React.Dispatch<React.SetStateAction<typeof defaultLoadsFilter>>
}

const getStatus = (loadsFilter: any) => {
    return loadsFilter.open && !loadsFilter.closed 
      ? 'open' 
      : !loadsFilter.open && loadsFilter.closed 
      ? 'closed' 
      : '';
  }
  
const HomeFilterForm:React.FC<HomeFilterFormProps> = ({ loadsFilter, setLoadsFilter }) => {
    const [orderNumber, setOrderNumber] = useState("");
    const showOrders = useSelector(getshowOrders);
    const database = useSelector(getConfig).selectedDataset;
    const dispatch = useDispatch();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(showOrders){
            dispatch(fetchOrders({ orderNumber, database, status: 'all' }))
        }
        else{
         const loadsStatus = getStatus(loadsFilter);
          const { jobNumber, consignee_id, shipper_id } = loadsFilter
          dispatch(fetchLoads({ status: loadsStatus, jobNumber, consignee_id, shipper_id, database }))
          console.log(loadsFilter)
        }
      }

      const handleSearchJobNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if(showOrders){
          setOrderNumber(value);
        }
        else{
          setLoadsFilter((prev:any) => ({
            ...prev,
            jobNumber:e.target.value
          }))
        }    
      }

  return (
    <form onSubmit={handleSearch} id="search">
             {showOrders 
                ? (
                   <input className="record"  type="text"placeholder="Search Order Number" value={orderNumber} onChange={handleSearchJobNumberChange}/>
                  )
                : (
                  <>
                  <input className="record"  type="text"placeholder="Search Job Number" value={loadsFilter.jobNumber} onChange={handleSearchJobNumberChange}/>
                  <HomeFilterSelect type="Shipper" loadsFilter={loadsFilter} setLoadsFilter={setLoadsFilter}/>
                  <HomeFilterSelect type="Consignee" loadsFilter={loadsFilter} setLoadsFilter={setLoadsFilter}/>
                  </>
                  
                ) 
             }
            <button id="searchbtn" type="submit">Search</button>
          </form>
  )
}

export default HomeFilterForm