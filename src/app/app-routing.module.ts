import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/security/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from '@guards/.';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        data: {
          roles: [
            'ROLE_ADMIN',
            'ROLE_SELLER'
          ]
        }
      },
      {
        path: 'home',
        component: DashboardComponent,
        data: {
          title: 'Inicio',
          roles: [
            'ROLE_ADMIN',
            'ROLE_SELLER'
          ]
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'items',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER']
        },
        loadChildren: () => import('./components/items/items.module').then(m => m.ItemsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER']
        },
        loadChildren: () => import('./components/sales/sales.module').then(m => m.SalesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'purchases',
        data: {
          roles: ['ROLE_ADMIN']
        },
        loadChildren: () => import('./components/purchases/purchases.module').then(m => m.PurchasesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'items-outputs',
        data: {
          roles: ['ROLE_ADMIN'],
        },
        loadChildren: () => import('./components/items-outputs/items-outputs.module').then(m => m.ItemsOutputsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER']
        },
        loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'brands',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER']
        },
        loadChildren: () => import('./components/brands/brands.module').then(m => m.BrandsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profiles',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER']
        },
        loadChildren: () => import('./components/profiles/profiles.module').then(m => m.ProfilesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER']
        },
        loadChildren: () => import('./components/app-info/app-info.module').then(m => m.AppInfoModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'configuration',
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_SELLER'],
        },
        loadChildren: () => import('./components/configurations/configuration.module').then(m => m.ConfigurationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        data: {
          roles: ['ROLE_ADMIN']
        },
        loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    data: {
      title: 'Inicio de Sesión'
    },
    component: LoginComponent
  },
  {
    path: '**',
    data: {
      title: 'Página no encontrada'
    },
    component: NotFoundComponent
  }
  /*{ // redirect all to main route
    path: '**',
    redirectTo: ''
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
