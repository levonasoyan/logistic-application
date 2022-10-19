import { Alert, AlertColor, Snackbar,  Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderErrorStatus, getOrders, getOrderSuccessStatus, resetErrorAndSuccess } from "../../features/orders/ordersSlice";
import OrderListItem from "./OrderListItem";
import { requestSort, sortingFunction } from '../../global/tableSorting';
import { getMuiIcon } from "../ListLoads/ListLoads";


interface OrderListProps {

}

const OrderList: React.FC<OrderListProps> = () => {

  const  [snakBar, setSnakBar] = useState({ open: false, text: '', severity: '' });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const orderSuccessStatus = useSelector(getOrderSuccessStatus);
  const orderErrorStatus = useSelector(getOrderErrorStatus);

  const orders = useSelector(getOrders);
  const dispatch = useDispatch();
  const sortedOrders = useMemo(() => sortingFunction(sortConfig, orders), [orders, sortConfig]);


  useEffect(() => {
    if(orderSuccessStatus){
      setSnakBar({ open: true, text: orderSuccessStatus, severity: 'success' });
    }
    else if(orderErrorStatus){
      setSnakBar({ open: true, text: orderErrorStatus, severity: 'error' });
    }
    // eslint-disable-next-line
  },[orderSuccessStatus, orderErrorStatus]);

  const handleSnakBarClose = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnakBar({ open: false, text: '', severity: '' });
    dispatch(resetErrorAndSuccess());
  };
  

  return (
    <>
      <Snackbar open={snakBar.open} autoHideDuration={6000} onClose={handleSnakBarClose} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleSnakBarClose} severity={snakBar.severity as AlertColor || 'success'}>
              {snakBar.text}
          </Alert>
      </Snackbar>
      <h1 className="order_h1">Orders List</h1> 
      <div className="tablediv">
        <table className="table">
          <thead>
            <tr className="table__tr">
              <th> <Button variant="outlined" onClick={() => requestSort('id', sortConfig, setSortConfig)}>
                            Order Id {getMuiIcon('id', sortConfig)}
                        </Button>
              </th>
           
              <th> <Button variant="outlined" onClick={() => requestSort('haulier_name', sortConfig, setSortConfig)}>
                            Haulier Name {getMuiIcon('haulier_name', sortConfig)}
                        </Button></th>
              <th><Button variant="outlined" onClick={() => requestSort('haulier_vat_number', sortConfig, setSortConfig)}>
                            Haulier VAT Number {getMuiIcon('haulier_vat_number', sortConfig)}
                        </Button></th>
              <th><Button variant="outlined" onClick={() => requestSort('order_date', sortConfig, setSortConfig)}>
                            Order Date {getMuiIcon('order_date', sortConfig)}
                        </Button></th>
              <th><Button variant="outlined" onClick={() => requestSort('order_number', sortConfig, setSortConfig)}>
                            Order Number {getMuiIcon('order_number', sortConfig)}
                        </Button></th>
              <th><Button variant="outlined" onClick={() => requestSort('price', sortConfig, setSortConfig)}>
                            Price {getMuiIcon('price', sortConfig)}
                        </Button></th>
              <th>
                <Button variant="outlined" onClick={() => requestSort('currency', sortConfig, setSortConfig)}>
                  Currency {getMuiIcon('currency', sortConfig)}
                </Button>
              </th>
              <th>Edit the Order</th>
              <th>Terms & Conditions</th>
              <th>Print</th>
              <th>Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders?.map((order: FetchedOrder) => (
              <OrderListItem key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
