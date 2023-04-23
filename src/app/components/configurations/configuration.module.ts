import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule {
}
