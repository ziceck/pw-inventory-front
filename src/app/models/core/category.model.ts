import { Item } from '@models/core/item.model';
import { Updateable } from '@models/core/updateable.model';
import { Deleteable } from '@models/core/deleteable.model';

export interface Category extends Updateable, Deleteable {
  id: number;
  name: string;
  items?: Item[];
}
