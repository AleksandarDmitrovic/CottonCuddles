export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export const products: Product[] = [];
