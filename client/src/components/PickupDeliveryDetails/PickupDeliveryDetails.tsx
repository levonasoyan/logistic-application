import React, { useState, useEffect } from "react";
import { Accordion,AccordionSummary,AccordionDetails,Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { initPickupDeliveryState } from "../../constants/initStates";
import SelectShipper from "./SelectShipper/SelectShipper";
import AdressDetails from "./AdressDetails/AdressDetails";
import Contact from "./Contact/Contact";
import { useDispatch, useSelector } from "react-redux";
import { getLoadToPost, getSelectedLoad, setDeliveryDetails, setLoadDetails, setPickupDetails } from "../../features/loads/loadsSlice";
import { useParams } from "react-router-dom";

interface PickupDeliveryDetailsProps {
  type: 'Pick up' | 'Delivery'
}

const PickupDeliveryDetails: React.FC<PickupDeliveryDetailsProps> = ({ type }) => {

  const [pickupDeliveryState, setPickupDeliveryState] = useState(initPickupDeliveryState);
  const dispatch = useDispatch();
  const selectedLoad: FetchedSingleLoad|null = useSelector(getSelectedLoad);
  const loadToPost: LoadToPost = useSelector(getLoadToPost);
  const params:any = useParams();


  useEffect(() => {
    if(selectedLoad && params.id){
      const data: any = type === 'Pick up' ? selectedLoad.load_details?.pickupDetails : selectedLoad.load_details?.deliveryDetails;
      setPickupDeliveryState(data);
    }
    return () => setPickupDeliveryState(initPickupDeliveryState);
    // eslint-disable-next-line
  },[selectedLoad, type]);


  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPickupDeliveryState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // set pickup date for load details
    if(id === 'date' && type === 'Pick up'){
      dispatch(setLoadDetails({ ...loadToPost.loadDetails, pickup_date: value }));
    }else if(!id && type === 'Pick up'){
      dispatch(setLoadDetails({ ...loadToPost.loadDetails, pickup_date: initPickupDeliveryState.date }));
    }
  };

  const handleDispatchState = () => {
    const dispatchAction = type === 'Pick up' ? setPickupDetails : setDeliveryDetails;
    dispatch(dispatchAction(pickupDeliveryState));
  }

  return (
    <>
      <Accordion onMouseLeave={handleDispatchState}
        sx={{ width: "800px", marginTop: "30px", marginRight: "10px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
          <Typography sx={{ color: "#465282", fontSize: "25px" }}>
            {type} Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="pickup__div">
            <form action="#" className="pickup">
              <h2 className="p__details">{type} Details</h2>
              <div className="pickup__row">
                <label htmlFor="date">
                  {" "} {type} Date
                  <input type="date" id="date" value={pickupDeliveryState?.date}  onChange={handlePickupChange}/>
                </label>
                <label htmlFor="pickup__timefrom">
                  {" "} {type} time from
                  <input type="time" id="time_from" name="time" step="300" value={pickupDeliveryState?.time_from} onChange={handlePickupChange}/>
                </label>
                <label htmlFor="time_to">
                  {" "} {type} time to
                  <input type="time" id="time_to" value={pickupDeliveryState?.time_to} onChange={handlePickupChange} />
                </label>
              </div>
              <SelectShipper type={type} setPickupDeliveryState={setPickupDeliveryState} />
              <Contact shipmentState={pickupDeliveryState} handleChange={handlePickupChange} />
              <AdressDetails pickupDeliveryState={pickupDeliveryState} setPickupDeliveryState={setPickupDeliveryState} />
            </form>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PickupDeliveryDetails;
