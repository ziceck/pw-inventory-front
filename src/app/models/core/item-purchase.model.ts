import { Item, Purchase } from '@models/core';

export interface ItemPurchase {
  id: number;
  item: Item;
  purchase: Purchase;
  quantity: number;
  price: number;
}
