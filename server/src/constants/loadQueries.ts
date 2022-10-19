export const loadQuery = `
    SELECT ftl.*, sh.name AS shipper_name, shp.name AS consigne_name, e.name AS created_by 
    FROM fms_tt_load ftl
    LEFT JOIN shipper sh ON sh.id = ftl.consignee_id
    LEFT JOIN shipper shp ON shp.id = ftl.shipper_id
    LEFT JOIN employee e ON e.id = ftl.employee_id
`;

export const singleLoadQuery = `
    SELECT ftl.*, ftld.load_details, sh.name AS shipper_name, shp.name AS consigne_name, e.name AS created_by 
    FROM fms_tt_load ftl 
    LEFT JOIN fms_tt_load_details ftld ON ftl.id = ftld.load_id
    LEFT JOIN shipper sh ON sh.id = ftl.consignee_id
    LEFT JOIN shipper shp ON shp.id = ftl.shipper_id 
    LEFT JOIN employee e ON e.id = ftl.employee_id
`;

export const updateBulkLoadsOrderIdQuery = `
    UPDATE fms_tt_load SET order_id = %L
    WHERE id IN (%L) RETURNING*
`;

export const deleteBulkLoadsOrderIdQuery = `
    UPDATE fms_tt_load SET order_id = $1
    WHERE order_id = $2 RETURNING*;
`;