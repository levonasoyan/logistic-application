export const loadFilterQueryParams = (filter: any, query: string) => {
    const { status, job_number, consignee_id, shipper_id } = filter;
    let counter = 1;
    const params: any[] = [];
    if(status === 'open'){
      query += ' WHERE ftl.order_id IS NULL AND canceled = false';
    }
    else if(status === 'closed'){
      query += ' WHERE ftl.order_id IS NOT NULL AND canceled = false';
    }
    else if(status === 'canceled'){
        query += ' WHERE canceled = true';
    }
    if(job_number){
        query +=  ` ${!query.includes('WHERE') ? 'WHERE' : 'AND'} job_number iLike $${counter}`;
        counter ++;
        params.push(`%${job_number}%`);
      }
      if(consignee_id){
        query +=  ` ${!query.includes('WHERE') ? 'WHERE' : 'AND'} consignee_id = $${counter}`;
        counter ++;
        params.push(consignee_id);
      }
      if(shipper_id){
        query +=  ` ${!query.includes('WHERE') ? 'WHERE' : 'AND'} shipper_id = $${counter}`;
        counter ++;
        params.push(shipper_id);
      }

      return { query, params };
}