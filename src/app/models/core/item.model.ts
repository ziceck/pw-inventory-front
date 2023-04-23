import { Brand, Category } from '@models/core';
import { File } from './file.model';

export interface Item {
  id: number;
  name: string;
  barcode?: string;
  quantity: number;
  priceSale: number;
  pricePurchase: number;
  minimum: number;
  category: Category;
  brand?: Brand;
  user: any;
  photo?: File;
  dateCreated: Date;
}
