import { useEffect, useState } from 'react';
import { editOrder, fetchSingleOrder, postOrder } from '../api/orderAsyncThunk';
import { getOrderToPost, getSelectedOrder, resetErrorAndSuccess, setLoadIdList, setShowOrders, getOrderSuccessStatus, getOrderErrorStatus, resetSelectedOrder, setOrderDetailsSliceState } from '../features/orders/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import { useNavigate, useParams } from 'react-router-dom';
import OrderLoadsList from '../components/OrderDetails/OrderLoadsList/OrderLodsList';
import { removeClosedLoads } from '../features/loads/loadsSlice';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { initOrderState } from '../constants/initStates';
import { getConfig, getEmployeeDetails } from './../features/config/configSlice';


function Order() {
    
    const [snakBar, setSnakBar] = useState({ open: false, text: '', severity: '' });
    const orderSuccessStatus = useSelector(getOrderSuccessStatus);
    const orderErrorStatus = useSelector(getOrderErrorStatus);
    const database = useSelector(getConfig).selectedDataset;
    const employee_id = useSelector(getEmployeeDetails)?.id;

    const params:any = useParams();
    const orderToPost = useSelector(getOrderToPost);
    const selectedOrder = useSelector(getSelectedOrder);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if(params?.id && Number(params.id) !== selectedOrder?.id){
            dispatch(fetchSingleOrder({ id: params.id, database }));
        }
        return () => {
            dispatch(resetSelectedOrder());
        }
        // eslint-disable-next-line
    },[params?.id, database]);

    useEffect(() => {
        if(orderSuccessStatus){
          setSnakBar({ open: true, text: orderSuccessStatus, severity: 'success' });
        }
        else if(orderErrorStatus){
          setSnakBar({ open: true, text: orderErrorStatus, severity: 'error' });
        }
        // eslint-disable-next-line
    },[orderSuccessStatus, orderErrorStatus]);


    const handleOrderPost = () => {
        if(!orderToPost.orderDetails.haulier_id){
            alert('Please select haulier');
        }else if(!orderToPost.orderDetails.price){
            alert('Please assign a price')
        }
        else{
            dispatch(postOrder({ orderData: { ...orderToPost, orderDetails: { ...orderToPost.orderDetails, employee_id }}, database }));
            dispatch(setLoadIdList([]));
            dispatch(removeClosedLoads(orderToPost.loadIdList));
            dispatch(setShowOrders(true));
            dispatch(setOrderDetailsSliceState(initOrderState));
            navigate('/');
        }
    }

    const handleEdit = () => {
        dispatch(editOrder({ orderData: { ...orderToPost, id: Number(params.id) }, database }));
        navigate('/');
    };

    const handleSnakBarClose = (_?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnakBar({ open: false, text: '', severity: '' });
        dispatch(resetErrorAndSuccess());
    };


    return (
       <div className="wrapper_order">
           <Snackbar open={snakBar.open} autoHideDuration={6000} onClose={handleSnakBarClose} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleSnakBarClose} severity={snakBar.severity as AlertColor || 'success'}>
                    {snakBar.text}
                </Alert>
            </Snackbar>
           <div className="order_container">
                <div className="load__number">
                    <h2 className="load__number__h2">Order Number: </h2>
                    <div className="p__row">
                    <p>
                        Created by:{" "}
                        <span className="created__p"></span>
                    </p>
                    <p>
                        Order Date: <span className="updated__p"></span>{" "}
                    </p>
                    </div>
                </div>
           </div>

            <div className="order_container">
                <OrderDetails/>
            </div>
            
            <div className="order_container">
                <OrderLoadsList />
            </div>
            <div className="order_container">
                 {params.id ?  <button className='send_btn yellow' onClick={handleEdit} > Edit Order</button> : 
                 <button className='send_btn' onClick={handleOrderPost} >Save Order</button>}
            </div>
       </div>
    );
}

export default Order;