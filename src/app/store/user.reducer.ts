import { User } from '@models/security';
import * as UserActions from './user.actions';
import { ADD_USER } from './user.actions';

export function userReducer(state: User, action: UserActions.Actions): User {
  switch (action.type) {
    case ADD_USER:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
