import React, { useEffect, useRef, useState } from 'react';
import { FormHelperText, TextField, Typography } from '@mui/material';
import useStyles from './HaulierSelectStyle';
import _ from 'lodash';
import { getHauliers } from '../../../api/others';
import { initOrderState } from '../../../constants/initStates';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailsState, getOrderToPost, getSelectedOrder, setOrderDetails } from '../../../features/orders/ordersSlice';
import { useParams } from 'react-router-dom';
import { getConfig } from './../../../features/config/configSlice';

interface HaulierSelectProps {
    setOrderDetailsState: React.Dispatch<React.SetStateAction<typeof initOrderState>>
}
 
const HaulierSelect: React.FC<HaulierSelectProps> = ({ setOrderDetailsState }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [hauliers, setHauliers] = useState<Haulier[]>([]);
    const orderDetailsSliceState = useSelector(getOrderDetailsState);
    const [haulierName, setHaulierName] = useState(orderDetailsSliceState.haulier_name);
    const dropdownRef = useRef(null);
    const classes = useStyles();

    const orderToPost: OrderToPost = useSelector(getOrderToPost);
    const dispatch = useDispatch();
    const selectedOrder = useSelector(getSelectedOrder);
    const database = useSelector(getConfig).selectedDataset;
    const params = useParams();


    useEffect(() => {
        if(selectedOrder && params.id){
            const { haulier_name } = selectedOrder;
            setHaulierName(haulier_name);
            dispatch(setOrderDetails({ ...orderToPost.orderDetails, haulier_id: selectedOrder.haulier_id }));
            
        }
        // eslint-disable-next-line
      },[selectedOrder, params.id]);


    const detayFetchHauliers = useRef(_.debounce(async(input: string, database: string) => {
        const data = await getHauliers(input, database);
        data && setHauliers(data);
    }, 1000)).current;

    const handleHaulierChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setHaulierName(value);
        if(value.length >= 2){
            detayFetchHauliers(value, database);
            setShowDropdown(true);
        }
    }

    const handlehaulierSelect = (value: Haulier) => {
        const { address1, address2, city, zipcode, name, id, country_id, taxnumber } = value
        setHaulierName(value.name);
        // set haulier and consignee id
        dispatch(setOrderDetails({ ...orderToPost.orderDetails, haulier_id: id }));
        setOrderDetailsState(prev => ({
            ...prev,
            haulier_name: name || '',
            haulier_vat_number: taxnumber || '',
            haulier_address1: address1 || '',
            haulier_address2: address2 || '',
            haulier_city: city || '',
            haulier_zip: zipcode || '',
            haulier_country: country_id || 0
        }));
        setShowDropdown(false);
    }


    return ( 
        <>
        <FormHelperText>Haulier</FormHelperText>
        <div ref={dropdownRef}>
            <div>
                <TextField variant="outlined"  className={classes.autocomplete} size='small' type='string' 
                    value={haulierName} onChange={handleHaulierChange} />
            </div>
            {hauliers.length > 0 ? (
                <ul className={classes.listbox} style={{ display: `${showDropdown ? 'block' : 'none'}` }}>
                {hauliers.map(haulier => (
                    <li key={haulier.id} className={classes.listItem} onClick={() => handlehaulierSelect(haulier)}>
                        <Typography variant='subtitle1'>{haulier.name} {haulier.address1}</Typography>
                    </li>
                ))}
                </ul>
            ) : null}
        </div>
        </>
    );
}
 
export default HaulierSelect;

