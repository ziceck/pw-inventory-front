/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { BrandService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { brand, brands } from '@mocks/constants-mocks';

describe('IndexComponent', () => {

  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let brandService: BrandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      providers: [
        BrandService,
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay,
        FormBuilder,
        MatDialog
      ],
      imports: [
        HttpClientModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    brandService = TestBed.inject(BrandService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get brands', () => {
    const spy = spyOn(brandService, 'index').and.returnValue(of(brands));
    component['getBrands']();
    expect(spy).toHaveBeenCalled();
  });

  it('on add brand', () => {
    const spy = spyOn(component, 'openMatDialog');
    component.onAddBrand();
    expect(spy).toHaveBeenCalled();
  });

  it('on edit brand', () => {
    const mockBrand = {id: 1, name: 'General'};
    const spy = spyOn(component, 'openMatDialog');
    component.onEditBrand(mockBrand);
    expect(spy).toHaveBeenCalled();
  });

  it('open dialog mat brand', () => {
    const spy = spyOn(component['matDialog'], 'open').and.callThrough();
    component.openMatDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('on delete category', () => {
    const spy = spyOn(brandService, 'delete').and.returnValue(of(brand));
    component.brands = brands;
    component.onDeleteBrand(brand, 0);
    expect(spy).toHaveBeenCalled();
  });

});
