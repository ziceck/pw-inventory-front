/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { CategoryService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '@services/notifications';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Category } from '@models/core';

describe('CategoriesIndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let categoryService: CategoryService;
  const category: Category = {
    id: 2,
    name: 'General',
    updateable: true,
    deleteable: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      providers: [
        CategoryService,
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
    categoryService = TestBed.inject(CategoryService);
  });

  it('getCategories', () => {
    const spy = spyOn(categoryService, 'index').and.returnValue(of([category]));
    component['getCategories']();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onAddCategory', () => {
    const spy = spyOn(component, 'openMatDialog');
    component.onAddCategory();
    expect(spy).toHaveBeenCalled();
  });

  it('onEditCategory', () => {
    const mockCategory = {id: 1, name: 'General', items: [], updateable: true, deleteable: true};
    const spy = spyOn(component, 'openMatDialog');
    component.onEditCategory(mockCategory);
    expect(spy).toHaveBeenCalled();
  });

  it('open dialog mat category', () => {
    const spy = spyOn(component['matDialog'], 'open').and.callThrough();
    component.openMatDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('on delete category', () => {
    const spy = spyOn(categoryService, 'delete').and.returnValue(of(category));
    component.categories = [category];
    component.onDeleteCategory(category, 0);
    expect(spy).toHaveBeenCalled();
  });

});
