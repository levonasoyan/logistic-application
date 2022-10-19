import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { initPickupDeliveryState } from "../../../constants/initStates";

interface ContactProps {
  shipmentState: typeof initPickupDeliveryState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Contact: React.FC<ContactProps> = ({ shipmentState, handleChange }) => {

  return (
    <Accordion sx={{width: "100%",  marginTop: "20px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", }}>
     <AccordionSummary expandIcon={<ExpandMoreIcon />}   aria-controls="panel1a-content">
        <Typography sx={{ color: "#465282", fontSize: "25px" }}>
         Contact & ID
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <input type="text" placeholder="Person Name"id="person" value={shipmentState?.person}onChange={handleChange}/>
        <input type="text" placeholder="Contact" id="contact" value={shipmentState?.contact} onChange={handleChange}/>
        <input type="text" placeholder="Reference" id="reference" value={shipmentState?.reference} onChange={handleChange}/>
      </AccordionDetails>
    </Accordion>
  );
};

export default Contact;
