import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { AuthGuard, DeactivateGuard } from '@guards/.';
import { ItemHistoryComponent } from './item-history/item-history.component';

const itemsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: 'Productos Registrados',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateEditComponent,
    data: {
      title: 'Registrar Producto',
      roles: ['ROLE_ADMIN']
    },
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'edit/:id',
    component: CreateEditComponent,
    data: {
      title: 'Editar Producto',
      roles: ['ROLE_ADMIN'],
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id/history',
    component: ItemHistoryComponent,
    data: {
      title: 'Historial del Producto',
      roles: ['ROLE_ADMIN', 'ROLE_SELLER']
    },
    canActivate: [AuthGuard]
  }
];

/**
 * Contains routing for item module.
 */
@NgModule({
  imports: [RouterModule.forChild(itemsRoutes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule {

}
