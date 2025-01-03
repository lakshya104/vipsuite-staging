interface MessageObject {
  id: number;
  date_created: {
    date: string;
    timezone: string;
    timezone_type: string;
  };
  content: string;
  customer_note: boolean;
  added_by: string;
  order_id: number;
}

export interface MessageDetails {
  order_id: number;
  last_message: string;
  product_name: string;
  product_image: string;
  messages: MessageObject[];
  last_updated: {
    date: string;
    timezone: string;
    timezone_type: string;
  };
}

export interface MessageArray {
  order_id: number;
  last_message: string;
  product_name: string;
  product_image: string;
  last_updated: {
    date: string;
    timezone: string;
    timezone_type: string;
  };
}
