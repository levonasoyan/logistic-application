import React, { useEffect, useRef, useState } from 'react';
import { FormHelperText, TextField, Typography } from '@mui/material';
import useStyles from './selectedShipperStyles';
import _ from 'lodash';
import { getShippers } from '../../../api/others';
import { initPickupDeliveryState } from '../../../constants/initStates';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadToPost, getSelectedLoad, setLoadDetails } from '../../../features/loads/loadsSlice';
import { useParams } from 'react-router-dom';
import { getConfig } from './../../../features/config/configSlice';

interface SelectShipperProps {
    type: 'Pick up' | 'Delivery',
    setPickupDeliveryState: React.Dispatch<React.SetStateAction<typeof initPickupDeliveryState>>
}
 
const SelectShipper: React.FC<SelectShipperProps> = ({ type, setPickupDeliveryState }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [shippers, setShippers] = useState<Shipper[]>([]);
    const [shipperName, setShipperName] = useState('');
    const dropdownRef = useRef(null);
    const classes = useStyles();
    const params:any = useParams();

    const loadToPost: LoadToPost = useSelector(getLoadToPost);
    const selectedLoad: FetchedSingleLoad|null = useSelector(getSelectedLoad);
    const database = useSelector(getConfig).selectedDataset;
    const dispatch = useDispatch();


    useEffect(() => {
        if(selectedLoad && params.id){
            const name = type === 'Pick up' 
                ? selectedLoad.load_details.pickupDetails.company 
                : selectedLoad.load_details.deliveryDetails.company;
            setShipperName(name || '');
            // set consignee id or shipper id
            const { consignee_id, shipper_id } = selectedLoad.load_details.loadDetails;
            const key = type === 'Pick up' ? 'shipper_id' : 'consignee_id';
            const idValue = type === 'Pick up' ? shipper_id : consignee_id;
            setPickupDeliveryState(prev => ({
                ...prev,
                [key]: idValue
            }));
        }
        return () => setShipperName('');
    // eslint-disable-next-line
    },[selectedLoad, type]);


    const detayFetchShippers = useRef(_.debounce(async(input: string) => {
        const data = await getShippers(input, database);
        data && setShippers(data);
    }, 1000)).current;

    const handleShipperChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setShipperName(value);
        if(value.length >= 2){
            detayFetchShippers(value);
            setShowDropdown(true);
        }
    }

    const handleShipperSelect = (value: Shipper) => {
        const { address1, address2, city, zipcode, name, id, country_id } = value;
        setShipperName(value.name);
       
        // set shipper and consignee id
        type === 'Pick up'
            ? dispatch(setLoadDetails({ ...loadToPost.loadDetails, shipper_id: id }))
            : dispatch(setLoadDetails({ ...loadToPost.loadDetails, consignee_id: id }));
            
        setPickupDeliveryState(prev => ({
            ...prev,
            adress1: address1,
            adress2: address2,
            city: city,
            company: name,
            zip: zipcode,
            country_id: country_id || 0
        }));
        setShowDropdown(false);
    }


    return ( 
        <>
        <FormHelperText>Place of {type} </FormHelperText>
        <div ref={dropdownRef}>
            <div>
                <TextField variant="outlined"  className={classes.autocomplete} size='small' type='string' 
                    value={shipperName} onChange={handleShipperChange} />
            </div>
            {shippers.length > 0 ? (
                <ul className={classes.listbox} style={{ display: `${showDropdown ? 'block' : 'none'}` }}>
                {shippers.map(shipper => (
                    <li key={shipper.id} className={classes.listItem} onClick={() => handleShipperSelect(shipper)}>
                        <Typography variant='subtitle1'>{shipper.name} {shipper.address1} {shipper.city} {shipper.zipcode} {shipper.country_name}</Typography>
                    </li>
                ))}
                </ul>
            ) : null}
        </div>
        </>
    );
}
 
export default SelectShipper;

