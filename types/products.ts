export type Product = {
  id: number;
  category: string;
  name: string;
  imageUrl?: string;
  specs: string[];
  price: number;
  compareAtPrice?: number;
  badge?: string;
  available: boolean;
};