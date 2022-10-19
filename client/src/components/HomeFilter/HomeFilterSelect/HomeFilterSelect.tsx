import React, { useRef, useState } from 'react';
import { FormHelperText, TextField, Typography } from '@mui/material';
import useStyles from './selectedShipperStyles';
import _ from 'lodash';
import { getShippers } from '../../../api/others';
import { useSelector } from 'react-redux';
import { getConfig } from './../../../features/config/configSlice';
import { defaultLoadsFilter } from '../../../pages/Home';



interface SelectShipperProps {
    type: 'Shipper' | 'Consignee',
    loadsFilter: typeof defaultLoadsFilter,
    setLoadsFilter: React.Dispatch<React.SetStateAction<typeof defaultLoadsFilter>>
}
 
const HomeFilterSelect: React.FC<SelectShipperProps> = ({ type, loadsFilter, setLoadsFilter}) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [shippers, setShippers] = useState<Shipper[]>([]);
    const [shipperName, setShipperName] = useState('');
    const dropdownRef = useRef(null);
    const classes = useStyles();
    const database = useSelector(getConfig).selectedDataset;
 

    const detayFetchShippers = useRef(_.debounce(async(input: string, database: string) => {
        const data = await getShippers(input, database);
        data && setShippers(data);
    }, 1000)).current;


    const handleShipperChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setShipperName(value);
        if(value.length >= 2){
            detayFetchShippers(value, database);
            setShowDropdown(true);
        }
        else{
            type === 'Shipper'
            ? setLoadsFilter({...loadsFilter,shipper_id: 0})
            : setLoadsFilter({...loadsFilter,consignee_id: 0})
        }
    }

    const handleShipperSelect = (value: Shipper) => {
        const { id } = value
        setShipperName(value.name);
        // set shipper and consignee id
        type === 'Shipper'
            ? setLoadsFilter({...loadsFilter,shipper_id:id})
            : setLoadsFilter({...loadsFilter,consignee_id:id})
            
        setShowDropdown(false);
    }


    return ( 
        <>
        <FormHelperText>Filter by {type}</FormHelperText>
        <div ref={dropdownRef}>
            <div>
                <TextField variant="outlined"  className={classes.autocomplete} size='small' type='string' 
                    value={shipperName} onChange={handleShipperChange} />
            </div>
            {shippers.length > 0 ? (
                <ul className={classes.listbox} style={{ display: `${showDropdown ? 'block' : 'none'}` }}>
                {shippers.map(shipper => (
                    <li key={shipper.id} className={classes.listItem} onClick={() => handleShipperSelect(shipper)}>
                        <Typography variant='subtitle1'>{shipper.name} {shipper.address1}</Typography>
                    </li>
                ))}
                </ul>
            ) : null}
        </div>
        </>
    );
}
 
export default HomeFilterSelect;

