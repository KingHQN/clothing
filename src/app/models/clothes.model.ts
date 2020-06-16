export interface Category {
  id: number;
  name: string;
}

export interface Clothes {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string[];
  color: string[];
  categoryId: string;
}
