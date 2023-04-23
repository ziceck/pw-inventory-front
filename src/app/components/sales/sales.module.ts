import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    DetailsComponent
  ],
  exports: [],
  imports: [
    SharedModule,
    MaterialModule,
    SalesRoutingModule
  ]
})
export class SalesModule {

}
