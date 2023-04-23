import { ItemPurchase } from '@models/core';

export interface Purchase {
  id: number;
  description: string;
  dateCreated: Date;
  user: any;
  items: ItemPurchase[];
}
