import { employee_id } from './globalVariables';

let curr = new Date();
curr.setDate(curr.getDate());
let date = curr.toISOString().slice(0,10)

export const initPickupDeliveryState = {
  date: date,
  time_from: "",
  time_to: "",
  company: "",
  person: "",
  contact: "",
  reference: "",
  adress1: "",
  adress2: "",
  city: "",
  zip: "",
  country_id: 0,
  instructions: "",
}

export const initLoadSliceState = {
  pcs: 0,
  gross_weight: 0,
  volume: 0,
  employee_id,
  consignee_id: 0,
  shipper_id: 0
};

export const initLoadState = {
  pcs: 0,
  gross_weight: 0,
  volume: 0,
  employee_id
};

export const initLineState = {
  loadpcs: "",
  loadLength: "",
  loadWidth: "",
  loadHeight: "",
  id: "",
};

export const initOrderState = {
  order_date: '',
  haulier_name:"",
  haulier_vat_number: '',
  price:"",
  currency: '',
  haulier_address1:"",
  haulier_address2:"",
  haulier_city:"",
  haulier_zip:"",
  haulier_country_id: 0,
  haulier_instructions:""
}

export const initOrderSliceState = {
  employee_id,
  haulier_id: 0,
  haulier_instructions: '',
  price: 0,
  currency: ''
}

