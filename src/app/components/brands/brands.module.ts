import { NgModule } from '@angular/core';

import { BrandsRoutingModule } from './brands-routing.module';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    BrandsRoutingModule
  ]
})
export class BrandsModule { }
