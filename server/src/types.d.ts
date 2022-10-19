interface FetchedLoad{
    consigne_name: string,
    consignee_id: number,
    created_by: string,
    created_on: string
    employee_id: number
    gross_weight: number
    id: number
    job_number: string
    load_details: any,
    pcs: number
    pickup_date: string,
    shipper_id: number,
    shipper_name: string,
    updated_on: string,
    volume: number
  }
  
  type DimentionLineState = {
      loadpcs: string,
      loadLength: string,
      loadWidth: string,
      loadHeight: string,
      id:string
  };

  type initPickupDeliveryState = {
    date: string;
    time_from: string;
    time_to: string;
    company: string;
    person: string;
    contact: string;
    reference: string;
    adress1: string;
    adress2: string;
    city: string;
    zip: string;
    country_id: number;
    instructions: string;
}

type LoadDetails = {
  employee_id: number;
  gross_weight: number;
  pcs: number;
  volume: number;
  consignee_id: number;
  shipper_id: number;
}
  
  interface FetchedSingleLoad extends FetchedLoad{
    load_details: {
      pickupDetails: initPickupDeliveryState
      deliveryDetails: initPickupDeliveryState
      loadDetails: LoadDetails,
      fms_shipment_dimentions: DimentionLineState[]
    }
  }

  export type FetchedOrderForPrint = {
    employee_id: number,
    haulier_address1: string,
    haulier_address2: string,
    haulier_city: string,
    haulier_country: string,
    haulier_country_id: number,
    haulier_id: number,
    haulier_instructions:string,
    haulier_name: string,
    haulier_vat_number:string,
    haulier_zip: string,
    id: number,
    currency:string,
    loads: FetchedSingleLoad[]
    order_date: Date,
    order_number: string,
    price: number
  }