export interface ProductDetail {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  requestOnly?: boolean;
  category: string;
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
  size: string;
  quantity: number;
}
