import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
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
    CategoriesRoutingModule
  ]
})
export class CategoriesModule {
}
