import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoads } from "../api/loadAsyncThunk";
import ListLoads from "../components/ListLoads/ListLoads";
import { getLoads } from "../features/loads/loadsSlice";
import { getOrderToPost, getSelectedOrder, getshowOrders, resetSelectedOrder, setLoadIdList, setShowOrders} from "../features/orders/ordersSlice";
import Switch from "@mui/material/Switch";
import OrderList from "../components/OrderList/OrderList";
import { getLoadIdViaJobNumber } from "../api/others";
import HomeFilterForm from "../components/HomeFilter/HomeFilterForm";
import { getConfig } from "../features/config/configSlice";
import { fetchOrders } from "../api/orderAsyncThunk";


export const defaultLoadsFilter = { status: 'open', jobNumber: '', consignee_id: 0, shipper_id: 0 };
export const defaultOrderFilter = { status: 'normal' };

const Home: React.FC = () => {
  
  const [jobNumber, setJobNumber] = useState("");
  const [filteredLoads, setFilteredLoads] = useState<FetchedLoad[]>([]);
  const [selectedLoads, setSelectedLoads] = useState<any>({});
  const [loadsFilter, setLoadsFilter] = useState(defaultLoadsFilter);
  const [ordersFilter, setOrdersFilter] = useState(defaultOrderFilter);


  const loads: FetchedLoad[] = useSelector(getLoads);
  const { loadIdList } = useSelector(getOrderToPost);
  const selectedOrder = useSelector(getSelectedOrder);
  const showOrders = useSelector(getshowOrders);
  const database = useSelector(getConfig).selectedDataset;

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addLoadsPath = location.pathname === "/addLoads";

  useEffect(() => {
    dispatch(fetchOrders({ orderNumber: '', database, status: ordersFilter.status }));
    // eslint-disable-next-line
  },[ordersFilter, database])

  useEffect(() => {
    addLoadsPath && setLoadsFilter(defaultLoadsFilter);
  },[addLoadsPath]);

  useEffect(() => {
    const loadList = addLoadsPath
      ? loads.filter((load) => !loadIdList.includes(load.id))
      : loads;
    setFilteredLoads(loadList);
    // eslint-disable-next-line
  }, [loads, location.pathname]);

  const handleSwitchChange = (e: any) => {
    dispatch(setShowOrders(e.target.checked));
  };

  const handleSelect = (value: string) => {
    dispatch(fetchLoads({  ...loadsFilter, status: value, database }));
    setLoadsFilter(prev => ({ ...prev, status: value }));
  }

  const selectOrders = (value: string) => {
    setOrdersFilter(prev => ({ ...prev, status: value }));
  }

  const handleSetIdList = () => {
    const idList = Object.entries(selectedLoads).map(
      ([key, value]) => value && Number(key)
    );
    dispatch(setLoadIdList(idList));
    dispatch(resetSelectedOrder());
  };

  const handleExtendIdList = () => {
    const idList = Object.entries(selectedLoads).map(
      ([key, value]) => value && Number(key)
    );
    dispatch(setLoadIdList([...loadIdList, ...idList]));
    const navigatePath = selectedOrder
      ? `/order/${selectedOrder.id}`
      : "/order";
    navigate(navigatePath);
  };

 

  const handleImportClick = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await getLoadIdViaJobNumber(jobNumber, database);
    if (!jobNumber) {
      alert("Please Write a Job number");
    } 
    else if (!data) {
      alert("Load with this Job Number doesn't exist");
    } 
    else {
      const navigateRoute =  `/load/${data.id}`;
      navigate(navigateRoute);
    }
  };

  


  return (
    <div className="wrapper__home">
      <section className="home__buttons">
        <div className="home__left">
          <h2 className="searchh2">Search Records</h2>

          {!showOrders && <form onSubmit={handleImportClick } id="jobsearch">
            <input id="record" type="text" placeholder="Job Number" value={jobNumber} onChange={(e)=>setJobNumber(e.target.value)}/>
            <button id="import" type='submit'>
              Import
            </button>
          </form>}
           <HomeFilterForm loadsFilter={loadsFilter} setLoadsFilter={setLoadsFilter}/>
        </div>
        <div className="flex_right">
        {!showOrders ? (
            <div className="flex_check">
              <label>
                Open Loads
                <input type="radio" disabled={addLoadsPath} className="filled-in"
                  checked={loadsFilter.status === 'open'} onChange={() => handleSelect('open')}/>
              </label>
               
              {!addLoadsPath && <label>
                Closed Loads
                <input type="radio" className="filled-in"
                  checked={loadsFilter.status === 'closed'} onChange={() => handleSelect('closed')}/>
              </label>}

              <label>
                Canceled Loads
                <input type="radio" className="filled-in"
                    checked={loadsFilter.status === 'canceled'} onChange={() => handleSelect('canceled')}/>
              </label>

              
              <label>
                All Loads
                <input type="radio" className="filled-in"
                    checked={loadsFilter.status === 'all'} onChange={() => handleSelect('all')}/>
              </label>
            </div>
          ) : (
            <div className="flex_check">
              <label>
                Orders
                <input type="radio" className="filled-in"
                    checked={ordersFilter.status === 'normal'} onChange={() => selectOrders('normal')}/>
              </label>
              <label>
                Canceled Orders
                <input type="radio" className="filled-in"
                    checked={ordersFilter.status === 'canceled'} onChange={() => selectOrders('canceled')}/>
              </label>
              <label>
                All Orders
                <input type="radio" className="filled-in"
                    checked={ordersFilter.status === 'all'} onChange={() => selectOrders('all')}/>
              </label>
            </div>
          )}
        <div className="buttons_home">
        {!addLoadsPath && (
          <Link to="/load" className="createlink">
            Create Load
          </Link>
        )}
        {!addLoadsPath ? (
          <Link to="/order" className="createlink" onClick={handleSetIdList}>
            Create Order
          </Link>
        ) : (
          <button className="createlink" onClick={handleExtendIdList}>
            Add Loads
          </button>
        )}
        </div>
        </div>
        
      </section>
      <p className="hint">*Toggle the switch button to switch between lists, default is set to Loads List*</p>
      <div className="flex_check">
        
        <p>{showOrders ? "Switch to Loads List" : "Switch to Orders List"}</p>
        {!addLoadsPath && (
          <Switch checked={showOrders} onChange={handleSwitchChange} inputProps={{ "aria-label": "controlled" }} />
        )}
      </div>
      {showOrders ? (
        <OrderList/>
      ) : (
        <ListLoads filteredLoads={filteredLoads} selectedLoads={selectedLoads} setSelectedLoads={setSelectedLoads}
        />
      )}
    </div>
  );
};

export default Home;
