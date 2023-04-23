import { Item } from '@models/core/item.model';

export interface ItemOutput {
  id: number;
  item: Item;
  quantity: number;
  description: string;
  dateCreated: Date;
}
