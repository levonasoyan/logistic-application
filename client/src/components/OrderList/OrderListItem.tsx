import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cancelOrder, printOrder } from "../../api/orderAsyncThunk";
import { useSelector } from 'react-redux';
import { getConfig } from './../../features/config/configSlice';
import { colors } from './../../global/colors';
import { useDispatch } from 'react-redux';
import { Button, Popover, Typography } from "@mui/material";

interface OrderListItemProps {
  order: FetchedOrder,
}

const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {

  const [checked,setChecked] = useState(true);
  const database = useSelector(getConfig).selectedDataset;
  const { canceled, employee_id, id } = order;
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
  
  const onTermsChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setChecked(prev => !prev)
  }

  const handleDelete = () => {
    const cancelReason = prompt('What is the reason if cancelation?')
    if(cancelReason){
      dispatch(cancelOrder({ id, cancelReason, database }));
    }
    else{
      alert('No cancelation reason was entered');
    }
  }

  
  return (
      <tr style={ canceled ? { background: colors.red } : {} }>
        <td>{order.id}</td>
        <td>{order.haulier_name}</td>
        <td>{order.haulier_vat_number}</td>
        <td>{order.order_date.slice(0,10)}</td>
        <th>{order.order_number}</th>
        <td>{order.price}</td>
        <td>{order.currency}</td>

        <td>
          <Link to={`/order/${order.id}`} className="open_btn yellow">
            Edit
          </Link>
        </td>
        <td>
          <input type="checkbox" className='filled-in' onChange={onTermsChange} checked={checked} />
        </td>           
        <td>
          <button className="open_btn" onClick={ ()=> printOrder(order.id, order.order_number, checked, database) }>Print</button>
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
                <Typography sx={{ p: 2 }}>{order.cancel_reason}</Typography>
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
};

export default OrderListItem;
