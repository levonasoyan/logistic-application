import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from './../../global/colors';
import { useSelector } from 'react-redux';
import { getConfig } from './../../features/config/configSlice';
import { useDispatch } from 'react-redux';
import { cancelLoad } from '../../api/loadAsyncThunk';
import { Button, Popover, Typography } from '@mui/material';

interface LoadItemProps {
    load: FetchedLoad,
    selectedLoads: any,
    handleSelect: (id: number) => void,
}

const LoadItem: React.FC<LoadItemProps> = ({ load, selectedLoads, handleSelect }) => {

    const { canceled, order_id, employee_id, id } = load;
    const { selectedDataset: database } = useSelector(getConfig);
    const loggedInEmployeeId = useSelector(getConfig).employeeDetails?.id;
    const dispatch = useDispatch();
    const isCreator = employee_id === loggedInEmployeeId;
      // popover
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const showCancelReason = Boolean(anchorEl);
    const popoverId = showCancelReason ? 'simple-popover' : undefined;


    const handleShowPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        const cancelReason = prompt('What is the reason if cancelation?')
        if(cancelReason){
          dispatch(cancelLoad({ id, cancelReason, database }));
        }
        else{
          alert('No cancelation reason was entered');
        }
      }

    return ( 
        <tr style={ canceled || order_id ? { background: canceled ? colors.red : colors.green } : {}}>
            <td>
                <label>
                    <input type="checkbox" className='filled-in' 
                        checked={(selectedLoads[load.id]) ? true: false} onChange={() => handleSelect(load.id)} 
                    />
                    <span></span>
                </label>
            </td>
            <td>{load.id}</td>
            <td>{load.job_number}</td>
            <td>{load.pickup_date?.slice(0,10)}</td>
            <th>{load.consigne_name}</th>
            <th>{load.shipper_name}</th>
            <td>{load.created_by}</td>
            <td>{load.volume}</td>
            <td>{load.pcs}</td>
            <td>{load.gross_weight}</td>
            <td>
                <Link to={`/load/${load.id}`} className='open_btn yellow'>
                    Edit
                </Link>
            </td> 
            <td>
                {canceled ? (
                    <div>
                    <Button aria-describedby={popoverId} variant="contained" size='small' onClick={handleShowPopover}>
                        Reason
                    </Button>
                    <Popover id={popoverId} open={showCancelReason} anchorEl={anchorEl} onClose={handlePopoverClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    >
                        <Typography sx={{ p: 2 }}>{load.cancel_reason}</Typography>
                    </Popover>
                    </div>
                ) : (
                    <button className={isCreator ? `open_btn red` : ''} disabled={!isCreator} onClick={handleDelete}>
                    Cancel
                    </button>
                )}
            </td>
        </tr>
    );
}
 
export default LoadItem;
