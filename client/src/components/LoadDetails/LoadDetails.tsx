import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MaterialBox from "./MaterialBox/MaterialBox";
import { v4 as uuidv4 } from "uuid";
import { initLineState, initLoadState } from "../../constants/initStates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLoadToPost, getSelectedLoad, setLoadDetails, setShipmentDimentions } from '../../features/loads/loadsSlice';
import { useParams } from "react-router-dom";

interface LoadProps {

}

const LoadDetails: React.FC<LoadProps> = () => {
  
  const [loadDetailsState, setLoadDetailsState] = useState(initLoadState);
  const [loadDetailsRows, setLoadDetailsRows] = useState<DimentionLineState[]>([]);
 
  const loadToPost: LoadToPost = useSelector(getLoadToPost);
  const dispatch = useDispatch();
  const selectedLoad: FetchedSingleLoad|null = useSelector(getSelectedLoad);
  const params:any = useParams();


  useEffect(() => {
    if(selectedLoad && params.id){
      const { pcs, gross_weight, volume, employee_id } = selectedLoad.load_details.loadDetails
      setLoadDetailsState({ pcs, gross_weight, volume, employee_id });
      setLoadDetailsRows(selectedLoad.load_details?.fms_shipment_dimentions);
    }
    return () => setLoadDetailsState(initLoadState);
    // eslint-disable-next-line
  },[selectedLoad]);


  useEffect(() => {
        const { pcsSum, volumeSum } = loadDetailsRows.reduce((acc, item) => {
          const lineVolumeSum = Number(item.loadpcs) * Number(item.loadLength) * Number(item.loadWidth) * Number(item.loadHeight) 
            / 1000000;;
          acc.pcsSum += Number(item.loadpcs);
          acc.volumeSum += Number(lineVolumeSum);
          return acc;
        }, { pcsSum: 0, volumeSum: 0 });

        setLoadDetailsState((prev) => ({
          ...prev,
          pcs: pcsSum,
          volume: volumeSum 
        }));

    }, [loadDetailsRows]);


    useEffect(() => {
      !params.id && setLoadDetailsRows(() => [
        { ...initLineState, id: uuidv4() },
        { ...initLineState, id: uuidv4() },
      ]);
    },[params.id]);


  const handleAddline = () => {
    setLoadDetailsRows((prevState) => [
      ...prevState,
      { ...initLineState, id: uuidv4() },
    ]);
  };

  const handleLoadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoadDetailsState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDispatchState = () => {
    dispatch(setLoadDetails({ 
      ...loadToPost.loadDetails, 
      ...loadDetailsState, 
      gross_weight: loadDetailsState.gross_weight || 0 
    }));
    dispatch(setShipmentDimentions(loadDetailsRows));
  }


  return (
    <>
      <Accordion className="to" onMouseLeave={handleDispatchState}
        sx={{ width: "800px", marginTop: "30px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
          <Typography sx={{ color: "#465282", fontSize: "25px" }}>
            Load Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="load__div">
            <form action="#" className="loaddetails">
              <h2 className="load__details">Load Details</h2>
              <div className="pcs__intro">
                <p>
                  PCS <ArrowDownwardIcon />
                </p>
                <p>
                  Length (cm) <ArrowDownwardIcon />
                </p>
                <p>
                  Width (cm)<ArrowDownwardIcon />
                </p>
                <p>
                  Height (cm)<ArrowDownwardIcon />
                </p>
                <button type="button" className="add" onClick={handleAddline}>
                  Add
                </button>
              </div>
              {loadDetailsRows.map((item) => (
                <MaterialBox key={item.id} item={item} setLoadDetailsRows={setLoadDetailsRows}/>))}
              <div className="load_div_flex">
                <label htmlFor="pcs"> PCS
                  <input disabled  min="0" type="number" id="pcs"value={loadDetailsState?.pcs} onChange={handleLoadChange}/>
                </label>
                <label htmlFor="gross__weight"> Gross Weight<input type="number"  min="0"  id="gross_weight" placeholder="0"
                    value={loadDetailsState?.gross_weight}   onChange={handleLoadChange}/>
                </label>
                
                <label htmlFor="volume"> Volume (m3)
                  <input type="number" disabled  id="volume" min="0" placeholder="0"  
                    value={loadDetailsState?.volume}  onChange={handleLoadChange}/>
                    </label>
              </div>
            </form>   
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default LoadDetails;
