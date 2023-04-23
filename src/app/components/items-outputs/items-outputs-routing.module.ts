import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '@guards/.';
import { IndexComponent } from './index/index.component';

const itemsOutputsRouting: Routes = [
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
    component: CreateComponent,
    data: {
      title: 'Registrar Compra'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(itemsOutputsRouting)],
  exports: [RouterModule]
})
export class ItemsOutputsRoutingModule {

}
