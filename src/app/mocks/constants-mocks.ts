import { Brand, Category, Item, Purchase } from '@models/core';
import { Jwt, Role, User } from '@models/security';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserRole } from '@models/security/user-role.model';

export const item: Item = {
  id: 1,
  name: 'Test',
  priceSale: null,
  pricePurchase: 45.3,
  minimum: 40,
  dateCreated: new Date(),
  user: null,
  category: null,
  quantity: 2
};


export const itemWithoutId: Item = {
  id: undefined,
  name: 'Test',
  priceSale: null,
  pricePurchase: 45.3,
  minimum: 40,
  dateCreated: new Date(),
  user: null,
  category: null,
  quantity: 2
};
export const items = [item];

/*--------------------------------------------------------------------*/
export const purchase: Purchase = {
  id: 1,
  dateCreated: undefined,
  description: '',
  items: [],
  user: undefined
};

export const purchases = [purchase];

/*--------------------------------------------------------------------*/
export const category: Category = {
  id: 1,
  name: 'Test Category',
  deleteable: false,
  updateable: false,
};

export const categories = [category];

/*--------------------------------------------------------------------*/
export const role: Role = {
  id: 1,
  authority: 'ROLE_ADMIN'
};

export const roles = [role];
/*--------------------------------------------------------------------*/

export const brand: Brand = {
  id: 1,
  name: 'Test Brand'
};

export const brands = [brand];
/*--------------------------------------------------------------------*/

export const jwt: Jwt = {
  id: null,
  username: '',
  token_type: '',
  access_token: '',
  expires_in: 4,
  refresh_token: '',
  personalInformation: null,
  roles: ['ROLE_ADMIN']
};
/*--------------------------------------------------------------------*/

export const user: User = {
  id: 1,
  username: 'admin',
  roles: []
};

export const users = [user];
/*--------------------------------------------------------------------*/

export const activatedRouteMockUp = {
  provide: ActivatedRoute,
  useValue: {
    snapshot: {
      paramMap: convertToParamMap({
        id: 2,
      })
    }
  }
};

/*--------------------------------------------------------------------*/
export const userRole: UserRole = {
  user: 1,
  role: 1
};
