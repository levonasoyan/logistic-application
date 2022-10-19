import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getCurrencies } from "../../../api/others";
import { useState, useEffect } from "react";
import { initOrderState } from "../../../constants/initStates";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getSelectedOrder } from '../../../features/orders/ordersSlice';
import { getConfig } from './../../../features/config/configSlice';

interface currencyProps {
  orderDetailsState: typeof initOrderState;
  setOrderDetailsState: React.Dispatch<React.SetStateAction<typeof initOrderState>>;
}

const CurrencySelect: React.FC<currencyProps> = ({ orderDetailsState, setOrderDetailsState, }) => {

  const [currencies, setCurrencies] = useState<Currency[]>([]);   
  const params = useParams();
  const selectedOrder = useSelector(getSelectedOrder);
  const database = useSelector(getConfig).selectedDataset;

  useEffect(() => {
    let isCancelled = false;
    getCurrencies(database).then((data: Currency[]) => {
      if(data && !isCancelled){
        setCurrencies(data);
      }
    });
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line 
  }, [database]);

  useEffect(() => {
    if(params.id && selectedOrder) {
      setOrderDetailsState((prevState) => ({ ...prevState, currency: selectedOrder?.currency || currencies[0].curr }));
    }
    else if(currencies.length){
      setOrderDetailsState((prevState) => ({ ...prevState, currency: currencies[0]?.curr}));
    }
    // eslint-disable-next-line 
  },[params.id, selectedOrder, currencies]);

 
  const handleCurrencySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setOrderDetailsState((prevState) => ({
      ...prevState,
      currency: value,
    }));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Currency
        </InputLabel>
        <select
          onChange={handleCurrencySelect}
          id="currency"
          value={orderDetailsState.currency}
        >
          {currencies?.map((item: Currency) => (
            <option key={item.rn} value={item.curr}>
              {item.curr}
            </option>
          ))}
        </select>
      </FormControl>
    </Box>
  );
};

export default CurrencySelect;
