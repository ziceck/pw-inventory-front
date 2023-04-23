import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';

const salesRoutes: Routes = [
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
      title: 'Registrar Venta'
    }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: {
      title: 'Detalles de la Venta'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {

}
