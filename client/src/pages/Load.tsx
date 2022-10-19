import LoadDetails from "../components/LoadDetails/LoadDetails";
import { Link, useNavigate, useParams} from "react-router-dom";
import PickupDeliveryDetails from "../components/PickupDeliveryDetails/PickupDeliveryDetails";
import { useDispatch, useSelector} from "react-redux";
import { editLoad, fetchSingleLoad, postLoad } from "../api/loadAsyncThunk";
import { useEffect, useState } from "react";
import { getLoadToPost, getLoadError, getLoadSuccess, resetErrorAndSuccess } from "../features/loads/loadsSlice";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { setShowOrders } from "../features/orders/ordersSlice";
import { getEmployeeDetails } from "../features/config/configSlice";
import { getConfig } from './../features/config/configSlice';

const Load: React.FC<any> = () => {

  const dispatch = useDispatch();
  const loadToPost = useSelector(getLoadToPost);
  const loadSuccessStatus = useSelector(getLoadSuccess);
  const loadErrorStatus = useSelector(getLoadError);
  const employee_id = useSelector(getEmployeeDetails)?.id;
  const database = useSelector(getConfig).selectedDataset;
  const [snakBar, setSnakBar] = useState({ open: false, text: '', severity: '' });
  const params:any = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    params.id && dispatch(fetchSingleLoad({ id: params.id, database }));
  },[params.id, dispatch, database]);

  useEffect(() => {
    if(loadSuccessStatus){
      setSnakBar({ open: true, text: loadSuccessStatus, severity: 'success' });
    }
    else if(loadErrorStatus){
      setSnakBar({ open: true, text: loadErrorStatus, severity: 'error' });
    }
    // eslint-disable-next-line
  },[loadSuccessStatus, loadErrorStatus]);


  const handlePost = () => {
    const { consignee_id, shipper_id } = loadToPost.loadDetails;
    if(consignee_id && shipper_id){
      // in case of create new load, empty consignee_id
      const { pickupDetails, deliveryDetails, fms_shipment_dimentions, loadDetails } = loadToPost;
      const loadData = { pickupDetails, deliveryDetails, fms_shipment_dimentions, loadDetails: { ...loadDetails, order_id: null, employee_id }};
      dispatch(postLoad({ loadData, database }));
      dispatch(setShowOrders(false));
      navigate('/');
    }
    else{
      alert('Please select Pickup company and Delivery company');
    }
  };

  const handleEdit = () => {
      dispatch(editLoad({ loadData: loadToPost, id: Number(params.id), database }));
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
    <>
      <div className="wrapper__load">
        <Snackbar open={snakBar.open} autoHideDuration={6000} onClose={handleSnakBarClose} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleSnakBarClose} severity={snakBar.severity as AlertColor || 'success'}>
                {snakBar.text}
            </Alert>
        </Snackbar>
        <div className="load__container">
          <div className="load__number">
            <h2 className="load__number__h2">Load Number: </h2>
            <div className="p__row">
              <p>
                Created on:{" "}
                <span className="created__p"></span>
              </p>
              <p>
                Upadated on: <span className="updated__p"></span>{" "}
              </p>
              <p>
                Created by: <span className="created__P"></span>{" "}
              </p>
            </div>
          </div>
          <div className="flex">
            <PickupDeliveryDetails type='Pick up'/>
            <PickupDeliveryDetails type='Delivery'/>
          </div>
          <div className="flex2">
            <LoadDetails />
          </div>

          <div className="buttons">
             {params.id  &&  <button type="submit" id ="saveAsNew" onClick={handlePost}> 
              Save As New 
             </button> }
            <button type="submit" id="save" onClick={params.id ? handleEdit : handlePost}>
              {params.id ? "Edit Load" : "Save Load"}
            </button>
            <Link className="btnback" to="/">
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Load;
