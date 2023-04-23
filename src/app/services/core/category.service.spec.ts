/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { CategoryService } from '@services/core/category.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Category } from '@models/core';

describe('FileService', () => {

  let categoryService: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule
      ]
    });

    categoryService = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  it('create', () => {
    const mockCategory: Category = {id: null, name: 'General', items: [], updateable: false, deleteable: false};
    const spy = spyOn(categoryService['httpClient'], 'post').and.returnValue(of(mockCategory));
    categoryService.create(mockCategory).subscribe(value => {
      expect(value.name === mockCategory.name).toBeTrue();
    });
  });

  it('update', () => {
    const mockCategory: Category = {id: null, name: 'General', items: [], updateable: true, deleteable: true};
    const spy = spyOn(categoryService['httpClient'], 'put').and.returnValue(of(mockCategory));
    categoryService.update(mockCategory).subscribe(value => {
      expect(value.name === mockCategory.name).toBeTrue();
    });
    expect(spy).toHaveBeenCalled();
  });

});
