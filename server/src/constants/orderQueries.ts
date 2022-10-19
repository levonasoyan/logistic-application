import { loadQuery, singleLoadQuery } from "./loadQueries";

export const orderQuery = `
    SELECT fto.*, v.name as haulier_name, v.taxnumber as haulier_vat_number, 
    a.address1 AS haulier_address1, a.address2 as haulier_address2, a.city AS haulier_city, a.zipcode AS haulier_zip,
    c.name as haulier_country, c.id AS haulier_country_id,
    ( SELECT coalesce (jsonb_agg( t ), '[]') FROM ( 
        SELECT * FROM fms_tt_load
        WHERE order_id = fto.id
    ) t ) AS loads
    FROM fms_tt_orders fto
    LEFT JOIN vendor v ON v.id = fto.haulier_id 
    LEFT JOIN address a ON a.trans_id = v.id 
    LEFT JOIN country c ON c.id = a.country_id
`;

export const getSingleOrderQuery = (purpose: 'get'|'print') => {
    return `
    SELECT fto.*, v.name as haulier_name, v.taxnumber as haulier_vat_number, 
    a.address1 AS haulier_address1, a.address2 as haulier_address2, a.city AS haulier_city, a.zipcode AS haulier_zip,
    c.name as haulier_country, c.id AS haulier_country_id,
    ( SELECT coalesce (jsonb_agg( t ), '[]') FROM ( 
        ${purpose === 'get' ? loadQuery : singleLoadQuery} WHERE order_id = fto.id
    ) t ) AS loads
    FROM fms_tt_orders fto
    LEFT JOIN vendor v ON v.id = fto.haulier_id 
    LEFT JOIN address a ON a.trans_id = v.id 
    LEFT JOIN country c ON c.id = a.country_id
`
}
