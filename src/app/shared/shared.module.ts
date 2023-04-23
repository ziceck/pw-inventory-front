import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  DialogAddBrandComponent,
  DialogAddCategoryComponent,
  DialogAddItemComponent,
  DialogChangePasswordComponent,
  DialogExpiredSessionComponent,
  DialogSaleComponent,
  NoRecordsComponent,
  PhotoComponent,
  PwNavComponent,
  PwOptionComponent,
  SearchComponent,
  SelectBrandComponent,
  SelectCategoryComponent,
  SelectRoleComponent,
  SpinnerRequestComponent,
} from '@shared/.';
import { StatusItemDirective } from '@directives/.';
import { RolePipe, QuantityHistoryPipe } from '@pipes/.';


/**
 * Module for shared and reusable components in application.
 */
@NgModule({
    declarations: [
        SelectCategoryComponent,
        SpinnerRequestComponent,
        DialogAddItemComponent,
        SearchComponent,
        DialogSaleComponent,
        PwNavComponent,
        DialogChangePasswordComponent,
        PwOptionComponent,
        DialogAddCategoryComponent,
        PhotoComponent,
        QuantityHistoryPipe,
        DialogAddBrandComponent,
        DialogExpiredSessionComponent,
        NoRecordsComponent,
        RolePipe,
        StatusItemDirective,
        SelectRoleComponent,
        SelectBrandComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SelectCategoryComponent,
        SpinnerRequestComponent,
        SearchComponent,
        DialogSaleComponent,
        PwNavComponent,
        DialogChangePasswordComponent,
        PwOptionComponent,
        DialogAddCategoryComponent,
        PhotoComponent,
        QuantityHistoryPipe,
        DialogAddBrandComponent,
        DialogExpiredSessionComponent,
        NoRecordsComponent,
        NoRecordsComponent,
        RolePipe,
        StatusItemDirective,
        SelectRoleComponent,
        SelectBrandComponent,
    ]
})
export class SharedModule {

}
