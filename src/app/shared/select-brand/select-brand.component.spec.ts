/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBrandComponent } from './select-brand.component';
import { BrandService } from '@services/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { brands } from '@mocks/constants-mocks';

describe('SelectBrandComponent', () => {
  let component: SelectBrandComponent;
  let fixture: ComponentFixture<SelectBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectBrandComponent],
      providers: [
        BrandService,
      ],
      imports: [
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBrandComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get brands should call index', () => {
    const service = TestBed.inject(BrandService);
    const spy = spyOn(service, 'index').and.returnValue(of(brands));
    component['getBrands']();
    expect(spy).toHaveBeenCalled();
  });
});
