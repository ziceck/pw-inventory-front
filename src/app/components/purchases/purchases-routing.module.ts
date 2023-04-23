import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';

const purchasesRouting: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: 'Productos Registrados'
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Registrar Compra'
    }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: {
      title: 'Detalles de la Compra'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(purchasesRouting)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule {

}
