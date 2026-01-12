
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Apparel' | 'Home' | 'Accessories';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
