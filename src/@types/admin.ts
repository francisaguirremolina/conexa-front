export interface FulfillResponse {
  success: boolean;
  code:    string;
  data:    OrderData[];
}

export interface OrderData {
  orderNumber: number;
  success:     boolean;
  label:       string;
  error:       string;
}
