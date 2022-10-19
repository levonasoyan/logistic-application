import React, { useEffect, useState } from 'react';
import { Accordion,AccordionSummary,AccordionDetails,Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getCountries } from '../../../api/others';
import { initOrderState } from '../../../constants/initStates';
import { useSelector } from 'react-redux';
import { getConfig } from './../../../features/config/configSlice';


interface HaulierAdressProps {
  orderDetailsState: typeof initOrderState,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
 
const HaulierAdress: React.FC<HaulierAdressProps> = ({ orderDetailsState, handleChange, handleSelect }) => {

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

    return (
        <Accordion sx={{ width: "100%", marginTop: "20px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
        <AccordionSummary  expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content"  id="panel1a-header">
          <Typography sx={{ color: "#465282", fontSize: "25px" }}>
           Haulier Adress
          </Typography>
        </AccordionSummary>
         <AccordionDetails>
          <div className="shipmentfrom__div">
            <div className="shipmentfrom">
              <label htmlFor="adress1"> Adress1
                <input type="text" id="haulier_address1" value={orderDetailsState.haulier_address1} onChange={handleChange} />
              </label>
              <label htmlFor="adress2"> Adress2
                <input type="text" id="haulier_address2" value={orderDetailsState.haulier_address2} onChange={handleChange} />
              </label>
              <label htmlFor="city"> City
                <input type="text" id="haulier_city" value={orderDetailsState.haulier_city} onChange={handleChange} />
              </label>
              <label htmlFor="zip"> Zip code
                <input type="text"  id="haulier_zip" value={orderDetailsState.haulier_zip} onChange={handleChange} />
              </label>
             <p className="country">Country</p>
              <select id="haulier_country" value={orderDetailsState.haulier_country_id} onChange={handleSelect} >
              <option value={String(defaultCountry?.id)}>{defaultCountry?.name + " " + defaultCountry?.code}</option>  
                {countries?.map((item: any) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.name + " " + item.code}
                  </option>
                ))}
              </select>
              <label htmlFor="Instructions">
                 instructions
                <input type="text" id="haulier_instructions" value={orderDetailsState.haulier_instructions} onChange={handleChange} />
              </label>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
  );
}
 
export default HaulierAdress;