export const shipperQuery = `
    SELECT sh.id, sh.name, a.address1, a.address2, a.city, a.zipcode,
    c.name as country_name, c.id AS country_id
    FROM shipper sh 
    LEFT JOIN address a ON a.trans_id = sh.id 
    LEFT JOIN country c ON c.id = a.country_id
`;

export const vendorQuery = `
    SELECT v.id, v.name, v.taxnumber, a.address1, a.address2, a.city, a.zipcode,
    c.name as country_name, c.id AS country_id
    FROM vendor v
    LEFT JOIN address a ON a.trans_id = v.id 
    LEFT JOIN country c ON c.id = a.country_id
`;

