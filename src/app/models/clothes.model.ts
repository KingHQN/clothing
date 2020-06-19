export interface Category {
  _id: string;
  name: string;
}

export interface Clothes {
  _id: string;
  name: string;
  image: string;
  price: number;
  size: string[];
  color: string[];
  categoryId: string;
}
