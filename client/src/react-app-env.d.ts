// Load Types
interface FetchedLoad{
  cancel_reason: string,
  consigne_name: string,
  consignee_id: number,
  created_by: string,
  created_on: string,
  canceled: boolean,
  employee_id: number
  gross_weight: number
  id: number
  job_number: string
  load_details: any,
  order_id: number|null
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

interface FetchedSingleLoad extends FetchedLoad{
  load_details: {
    pickupDetails: initPickupDeliveryState
    deliveryDetails: initPickupDeliveryState
    loadDetails: LoadDetails,
    fms_shipment_dimentions: DimentionLineState[]
  }
}

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
  employee_id: number,
  gross_weight: number,
  pcs: number,
  volume: number,
  consignee_id: number,
  shipper_id: number
}

type LoadToPost = {
  pickupDetails: initPickupDeliveryState
  deliveryDetails: initPickupDeliveryState
  loadDetails: LoadDetails,
  fms_shipment_dimentions: LineState[]
}

// Other Types
type Country = {
  code: string,
  eumember: boolean,
  id: number,
  intlname: string,
  name: string
}

interface Shipper {
  address1: string,
  address2: string,
  city: string,
  country_id: number,
  id: number,
  country_name: string,
  name: string,
  zipcode: string
}

interface Haulier extends Shipper{
  taxnumber: string
}


// Order Types
type OrderDetails = {
  order_date: string;
  haulier_name: string;
  haulier_vat_number: string;
  haulier_id: number
  currency: string;
  price: string;
  haulier_adress1: string;
  haulier_adress2: string;
  haulier_city: string;
  haulier_zip: string;
  haulier_country: number;
  haulier_instructions: string;
}

type FetchedOrder = {
  employee_id: number,
  canceled: boolean;
  cancel_reason: string;
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
  loads: FetchedLoad[]
  order_date: string,
  order_number: string,
  price: number,
  currency:string,
}

type OrderSliceDetails = {
  employee_id: number,
  haulier_id: number,
  haulier_instructions: string,
  price: number
}

type OrderToPost = {
  orderDetails: OrderSliceDetails
  loadIdList: number[]
}


// Slice States
type LoadState = {
  loads: FetchedLoad[],
  selectedLoad: null|FetchedSingleLoad,
  loadToPost: LoadToPost,
  loadSuccess: string,
  loadError: string
}

type OrderState = {
  orders: any[],
  selectedOrder: null|any,
  orderToPost: OrderToPost,
  orderSuccess: string,
  orderError: string,
  showOrders: boolean,
  orderDetailsState: any
}

// config types
type ConfigState = {
  employeeDetails: {
    accessType: string;
    email: string;
    id: number
    login: string;
    name: string;
    role: string;
    workmobile: string | null; 
    workphone: string;
  } | null,
  datasets: {
    company: string;
    country: string;
    countryCode: string;
    dset: string;
  }[],
  selectedDataset: string,
  defaultCountry: any
}

type GlobalState = {
  loads: LoadState,
  orders: OrderState,
  config: ConfigState
}

type Currency = {
  rn: number,
  curr: string,
  precision: number
}

// types for table sorting
type SortConfig = {
  key: string;
  direction: string;
}

type SetSortConfig = React.Dispatch<React.SetStateAction<{
  key: string;
  direction: string;
}>>