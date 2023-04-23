import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ProfilesRoutingModule } from './profiles-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  exports: [],
  imports: [
    SharedModule,
    MaterialModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule {

}
