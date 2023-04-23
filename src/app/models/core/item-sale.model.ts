import { Item, Sale } from '@models/core';

export interface ItemSale {
  item: Item;
  sale: Sale;
  quantity: number;
  price: number;
}
