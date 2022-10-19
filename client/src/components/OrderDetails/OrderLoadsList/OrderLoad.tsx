import React from 'react';

interface OrderLoadProps {
    load: FetchedLoad,
    handleDelete: (id: number) => void
}
 
const OrderLoad: React.FC<OrderLoadProps> = ({ load, handleDelete }) => {
    return ( 
        <tr>
            <td>{load.job_number}</td>
            <td>{load.consignee_id}</td>
            <td>{load.shipper_name}</td>
            <td>{load.gross_weight}</td>
            <td>{load.pcs}</td>
            <td>
                <button className='delete_btn' onClick={() => handleDelete(load.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}
 
export default OrderLoad;
