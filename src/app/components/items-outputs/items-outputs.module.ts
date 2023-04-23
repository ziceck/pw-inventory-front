import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '@shared/shared.module';
import { ItemsOutputsRoutingModule } from './items-outputs-routing.module';
import { MaterialModule } from '@material/material.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ItemsOutputsRoutingModule
  ]
})
export class ItemsOutputsModule {
}
