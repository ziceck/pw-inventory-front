import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from '@material/material.module';
import { AppInfoRoutingModule } from './app-info-routing.module';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppInfoRoutingModule
  ]
})
export class AppInfoModule {
}
