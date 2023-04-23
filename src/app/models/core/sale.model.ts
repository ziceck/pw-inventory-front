import { ItemSale } from '@models/core';

export interface Sale {
  id?: number;
  description: string;
  dateCreated: Date;
  user: any;
  items: ItemSale[];
}
