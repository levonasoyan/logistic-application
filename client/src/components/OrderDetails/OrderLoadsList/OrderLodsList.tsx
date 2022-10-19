import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderToPost, setLoadIdList, getSelectedOrder, setShowOrders } from '../../../features/orders/ordersSlice';
import { getLoads } from '../../../features/loads/loadsSlice';
import { useEffect } from 'react';
import OrderLoad from './OrderLoad';
import { useNavigate, useParams } from 'react-router-dom';

interface OrderLoadsListProps {
    
}
 
const OrderLoadsList: React.FC<OrderLoadsListProps> = () => {

    const loads = useSelector(getLoads);
    const { loadIdList } = useSelector(getOrderToPost);
    const selectedOrder = useSelector(getSelectedOrder);
    const dispatch = useDispatch();
   
    const [selectedLoads, setSelectedLoads] = useState<FetchedLoad[]>([]);
    const navigate = useNavigate();
    const params:any = useParams();


    useEffect(() => {
        if(params.id && selectedOrder){
            const loadsToDisplay = [...loads, ...selectedOrder.loads].filter(load => loadIdList.includes(load.id));
            setSelectedLoads(loadsToDisplay);
        }
        else{
            const loadsToDisplay = loads.filter(load => loadIdList.includes(load.id));
            setSelectedLoads(loadsToDisplay);
        }
    },[loads, loadIdList, params.id, selectedOrder]);


    const handleDelete = (id: number) => {
        const newIdList = loadIdList.filter(item => item !== id);
        dispatch(setLoadIdList(newIdList));
    }

    const navigateToLoads = () => {
        dispatch(setShowOrders(false));
        navigate('/addLoads');
    }


    return ( 
        <div className="tablediv">
            <table className="table">
                <thead>
                    <tr className="table__tr">
                        <th>Job Number</th>                    
                        <th>Place of loading</th>
                        <th>Place of delivery</th>
                        <th>Gross Weight</th>
                        <th>Pcs</th>                    
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedLoads.map(load => (
                        <OrderLoad key={load.id} load={load} handleDelete={handleDelete}/>
                    ))}
                </tbody>
            </table>
            <button className='add_load' onClick={navigateToLoads}>
                Add Loads
            </button>
        </div>
    );
}
 
export default OrderLoadsList;