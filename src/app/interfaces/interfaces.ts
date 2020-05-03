export interface OrdersResp {
  orders: Order[];
}

export interface OrderResp {
  message: string;
  order: Order;
}

export interface Order {
  id?: string;
  creationDate?: string;
  executionDate?: string;
  dayOfService?: number;
  theoryDescription?: string;
  realDescription?: string;
  technicalObservation?: string;
  customerObservation?: string;
  ammount?: number;
  status?: string;
  user?: User;
  customer?: Customer;
  technical?: Technical;
}

export interface Technical {
  id?: string;
  technicalIdCompany?: string;
  status?: string;
  bussinessPartner?: BussinessPartner;
}

export interface Customer {
  id?: string;
  customerIdCompany?: string;
  status?: string;
  bussinessPartner?: BussinessPartner;
}

export interface BussinessPartner {
  id?: string;
  firstName?: string;
  lastName?: string;
  nit?: string;
  direction?: string;
  telephone?: number;
  status?: string;
}

export interface User {
  id?: string;
  userName?: string;
  password?: string;
  role?: string;
  status?: string;
}
