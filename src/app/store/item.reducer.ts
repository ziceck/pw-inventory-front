import { Item } from '@models/core';
import * as ItemActions from './item.actions';

export function itemReducer(state: Item, action: ItemActions.Actions): Item {
  switch (action.type) {
    case 'Add item':
      state = action.payload;
      return state;
    default:
      return state;
  }
}
