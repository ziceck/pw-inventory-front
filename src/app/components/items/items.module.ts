import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemHistoryComponent } from './item-history/item-history.component';

/**
 * Contains main components in item module.
 */
@NgModule({
  declarations: [
    IndexComponent,
    CreateEditComponent,
    ItemHistoryComponent
  ],
  exports: [],
  imports: [
    SharedModule,
    MaterialModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule {

}
