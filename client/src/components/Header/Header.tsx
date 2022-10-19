import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { resetErrorAndSuccess } from "../../features/loads/loadsSlice";
import { useEffect } from "react";
import DarkMode from "../../assets/DarkMode/DarkMode";
import { fetchLoads } from "../../api/loadAsyncThunk";
import { fetchUserDatasets, fetchUserDetauls, getDefaultCountry } from "../../api/configAsynkThunk";
import { getConfig, selectDataset } from "../../features/config/configSlice";


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userConfig = useSelector(getConfig);
  const database = userConfig.selectedDataset;
  const datasets = userConfig.datasets?.map(item => item.dset);


  useEffect(() => {
    navigate('/');
    dispatch(fetchUserDatasets());
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    if(database){
      dispatch(fetchUserDetauls(database));
      dispatch(getDefaultCountry(database));
      dispatch(fetchLoads({ status: 'open', jobNumber: '', database }));
    }
    // eslint-disable-next-line
  },[database]);


  const handleDatasetSetect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch(selectDataset(value));
  }
  

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" onClick={() => dispatch(resetErrorAndSuccess())}>
          <figure className="logo__div">
            <HomeIcon className="logo" />
          </figure>
        </Link>
        <h2 className="header__h2">LOADS & ORDERS</h2>
        <DarkMode/>
         <p className="db_p">Select Country Database</p>
         <select value={userConfig.selectedDataset} onChange={handleDatasetSetect}>
           {datasets?.map((item, index) => (
             <option key={index} value={item}>{item}</option>
           ))}
         </select>
        
      </div>
    </header>
  );
};

export default Header;
