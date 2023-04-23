/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryComponent } from './select-category.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '@services/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { category } from '@mocks/.';

describe('SelectCategoryComponent', () => {
  let component: SelectCategoryComponent;
  let fixture: ComponentFixture<SelectCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectCategoryComponent],
      providers: [
        CategoryService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoryComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get categories should call index', () => {
    const service = TestBed.inject(CategoryService);
    const spy = spyOn(service, 'index').and.returnValue(of([category]));
    component['getCategories']();
    expect(spy).toHaveBeenCalled();
  });
});
