import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const profilesRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Mi perfil'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(profilesRoutes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {

}
