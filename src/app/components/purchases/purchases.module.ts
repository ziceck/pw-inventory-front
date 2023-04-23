import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { PurchasesRoutingModule } from './purchases-routing.module';
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
    PurchasesRoutingModule
  ]
})
export class PurchasesModule {

}
