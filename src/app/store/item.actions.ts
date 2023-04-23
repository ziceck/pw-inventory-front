import { Action } from '@ngrx/store';
import { Item } from '@models/core';

export const ADD_ITEM = 'Add item';

export class AddItem implements Action {

  readonly type = ADD_ITEM;

  constructor(public payload: Item) {
  }

}

export type Actions = AddItem;
