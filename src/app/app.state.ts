import { Item } from '@models/core';
import { User } from '@models/security';

export interface AppState {
  readonly item: Item;
  readonly user: User;
}
