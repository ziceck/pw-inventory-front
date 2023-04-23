import { Action } from '@ngrx/store';
import { User } from '@models/security';
export const ADD_USER = 'add_user';

export class AddUser implements Action {

  type: string = ADD_USER;

  constructor(public payload: User) {
  }

}

export type Actions = AddUser;
