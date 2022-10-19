import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { initPickupDeliveryState } from "../../../constants/initStates";
import { getCountries } from "../../../api/others";
import { useSelector } from "react-redux";
import { getConfig } from "../../../features/config/configSlice";


interface DetailsProps {
  pickupDeliveryState: typeof initPickupDeliveryState;
  setPickupDeliveryState: React.Dispatch<React.SetStateAction<typeof initPickupDeliveryState>>
}

const AdressDetails: React.FC<DetailsProps> = ({ pickupDeliveryState, setPickupDeliveryState }) => {

  const [countries, setCountries] = useState<Country[]>([]);
  const { defaultCountry, selectedDataset: database } = useSelector(getConfig);


  useEffect(() => {
    let isCancelled = false;
    getCountries(database).then(data => {
      if(data && !isCancelled){
        setCountries(data);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [database]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPickupDeliveryState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPickupDeliveryState((prevState) => ({
      ...prevState,
      country_id: Number(value)
    }));
  };
 
  return (
    <Accordion sx={{ width: "100%", marginTop: "20px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
      <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content"  id="panel1a-header">
        <Typography sx={{ color: "#465282", fontSize: "25px" }}>
         Adress Details
        </Typography>
      </AccordionSummary>
       <AccordionDetails>
        <div className="shipmentfrom__div">
          <div className="shipmentfrom">
            <label htmlFor="adress1"> Adress1
              <input type="text"  id="adress1" value={pickupDeliveryState?.adress1} onChange={handleChange}  />
            </label>
            <label htmlFor="adress2"> Adress2
              <input type="text" id="adress2"  value={pickupDeliveryState?.adress2} onChange={handleChange} />
            </label>
            <label htmlFor="city"> City
              <input type="text" id="city"  value={pickupDeliveryState?.city} onChange={handleChange}    />
            </label>
            <label htmlFor="zip"> Zip code
              <input type="text"  id="zip" value={pickupDeliveryState?.zip}  onChange={handleChange}  />
            </label>
           <p className="country">Country</p>
            <select id="country"  value={pickupDeliveryState?.country_id} onChange={handleSelect}>
              {defaultCountry? <option value={String(defaultCountry?.id) || ''}>{defaultCountry?.name + " " + defaultCountry?.code}</option> : "Select The Country"}
                 
                {countries?.map((item: any) => (
                <option key={item.id} value={String(item.id) || ''}>
                  {item.name + " " + item.code}
                </option>
              ))}
                                                              
            </select>
           
            <label htmlFor="Instructions">
               instructions
              <input type="text" id="instructions" value={pickupDeliveryState?.instructions} onChange={handleChange}  />
            </label>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdressDetails;
