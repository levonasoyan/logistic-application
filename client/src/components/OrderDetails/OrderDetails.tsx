import React, { useEffect, useState } from 'react';
import { Accordion,AccordionSummary,AccordionDetails,Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HauliearAdress from './HauliearAdress/HauliearAdress';
import HaulierSelect from './HaulierSelect/HaulierSelect';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import { useDispatch } from 'react-redux';
import { getOrderToPost, getSelectedOrder, setOrderDetails, getOrderDetailsState, setOrderDetailsSliceState } from '../../features/orders/ordersSlice';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { initOrderState } from '../../constants/initStates';


interface OrderDetailsProps {
    
}

const OrderDetails: React.FC<OrderDetailsProps> = () => {

    const params:any = useParams();
    const orderDetailsSliceState = useSelector(getOrderDetailsState);
    const [orderDetailsState, setOrderDetailsState] = useState<typeof initOrderState>(orderDetailsSliceState);
    const { orderDetails }= useSelector(getOrderToPost);
    const dispatch = useDispatch();
    const selectedOrder = useSelector(getSelectedOrder);


    useEffect(() => {
        let isCancelled = false;
        if(selectedOrder && params.id && !isCancelled){
            const { haulier_address1, haulier_address2, price, haulier_vat_number, haulier_name, 
                haulier_city, haulier_zip, haulier_instructions, haulier_country_id } = selectedOrder;
            setOrderDetailsState((prev) => ({
                ...prev,
                haulier_vat_number: haulier_vat_number || '',
                haulier_address1: haulier_address1 || '',
                haulier_address2: haulier_address2 || '',
                price: price || '',
                haulier_name: haulier_name || '',
                haulier_city: haulier_city || '',
                haulier_zip: haulier_zip || '',
                haulier_instructions: haulier_instructions || '',
                haulier_country_id: haulier_country_id || 0
            }));            
        }
        return () => {
            isCancelled = true;
        };
    },[selectedOrder, params.id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setOrderDetailsState(prev => ({
            ...prev,
            [id]: value
        }));
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setOrderDetailsState((prevState) => ({
          ...prevState,
          haulier_country_id: Number(value)
        }));
      };

    const handleDispatchState = () => {
        const { haulier_instructions, price, currency } = orderDetailsState;
        const orderPrice = price ? Number(price) : 0;
        dispatch(setOrderDetails({ ...orderDetails, haulier_instructions, price: orderPrice, currency }));
        dispatch(setOrderDetailsSliceState(orderDetailsState));
    }


    return ( 
        <Accordion onMouseLeave={handleDispatchState}
            sx={{ width: "800px", marginTop: "30px", marginRight: "10px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}} >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
            <Typography sx={{ color: "#465282", fontSize: "25px" }}>
                    Details
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div className="pickup__div">
                <form action="#" className="pickup">
                <div className="details_flex">
                    <HaulierSelect setOrderDetailsState={setOrderDetailsState}/>
                    <input type="text" id="haulier_vat_number" placeholder='VAT Number' 
                        value={orderDetailsState.haulier_vat_number} onChange={handleChange}/>
                        <div className="price_flex">
                            <input type="number" id="price"  placeholder='Price'
                            value={orderDetailsState.price} onChange={handleChange}/>
                            <CurrencySelect orderDetailsState={orderDetailsState} setOrderDetailsState={setOrderDetailsState} />
                        </div>
                   
                    <HauliearAdress orderDetailsState={orderDetailsState} handleChange={handleChange} handleSelect={handleSelect}/>
                </div>
                </form>
            </div>
            </AccordionDetails>
        </Accordion>

    );
}
 
export default OrderDetails;
