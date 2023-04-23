import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: 'Usuarios Registrados'
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Registrar Usuario'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: 'Editar Usuario'
    }
  }
];

/**
 * Contains routing for user module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
