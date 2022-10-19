import React, { useMemo, useState } from 'react';
import LoadItem from './LoadItem';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadError, getLoadSuccess, resetErrorAndSuccess } from '../../features/loads/loadsSlice';
import { Alert, AlertColor, Snackbar, Button } from '@mui/material';
import { useEffect } from 'react';
import { requestSort, sortingFunction } from '../../global/tableSorting';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';


interface ListLoadsProps {
    filteredLoads: FetchedLoad[],
    selectedLoads: any,
    setSelectedLoads: React.Dispatch<any>
}

export  const getMuiIcon = (name: string, sortConfig: SortConfig) => {
    if (!sortConfig.key) {
      return;
    } 
    else if(sortConfig.key === name){
      return (sortConfig.direction === 'descending') ? <ArrowUpward /> : <ArrowDownward />;
    } 
    else {
      return undefined
    }
};

const ListLoads: React.FC<ListLoadsProps> = ({ filteredLoads, selectedLoads, setSelectedLoads }) => {
    
    const postEditStatus = useSelector(getLoadSuccess);
    const postEditError = useSelector(getLoadError);
    const  [snakBar, setSnakBar] = useState({ open: false, text: '', severity: '' });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const dispatch = useDispatch();


    const sortedLoads = useMemo(() => sortingFunction(sortConfig, filteredLoads), [filteredLoads, sortConfig]);


    useEffect(() => {
        if(postEditStatus){
          setSnakBar({ open: true, text: postEditStatus, severity: 'success' });
        }
        else if(postEditError){
          setSnakBar({ open: true, text: postEditError, severity: 'error' });
        }
        // eslint-disable-next-line
    },[postEditStatus, postEditError]);


    const handleSelect = (id: number) => {
        setSelectedLoads((prev: any) => ({
            ...prev,
            [id]: prev[id] ? false : true
        }));
    }

    const handleSnakBarClose = (_?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnakBar({ open: false, text: '', severity: '' });
        dispatch(resetErrorAndSuccess());
    };

    
    return (
        <>
        <h1 className="order_h1">Loads List</h1> 
        
      <div className="tablediv">
           
            <Snackbar open={snakBar.open} autoHideDuration={6000} onClose={handleSnakBarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleSnakBarClose} severity={snakBar.severity as AlertColor || 'success'}>
                    {snakBar.text}
                </Alert>
            </Snackbar>
          
        <table className="table">
            <thead>
                <tr className="table__tr">
                    <th>Select</th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('id', sortConfig, setSortConfig)}>
                            Id {getMuiIcon('id', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('job_number', sortConfig, setSortConfig)}>
                            Job Number {getMuiIcon('job_number', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('pickup_date', sortConfig, setSortConfig)}>
                            Pickup date {getMuiIcon('pickup_date', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('consigne_name', sortConfig, setSortConfig)}>
                            Place of loading {getMuiIcon('consigne_name', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('shipper_name', sortConfig, setSortConfig)}>
                            Place of delivery {getMuiIcon('shipper_name', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('created_by', sortConfig, setSortConfig)}>
                            Created By {getMuiIcon('created_by', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('volume', sortConfig, setSortConfig)}>
                            Volume {getMuiIcon('volume', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('pcs', sortConfig, setSortConfig)}>
                            Pcs {getMuiIcon('pcs', sortConfig)}
                        </Button>
                    </th>
                    <th>
                        <Button variant="outlined" onClick={() => requestSort('gross_weight', sortConfig, setSortConfig)}>
                            Gross Weight {getMuiIcon('gross_weight', sortConfig)}
                        </Button>
                    </th>
                    <th>Edit Load</th>
                    <th>Cancel Load</th>
                </tr>
            </thead>
            <tbody>
            {sortedLoads.map((load: FetchedLoad) => (
                <LoadItem key={load.id} load={load} selectedLoads={selectedLoads}
                    handleSelect={handleSelect}/>
            ))}
            </tbody>
        </table>
    </div>
    </>
    );
}

export default ListLoads;