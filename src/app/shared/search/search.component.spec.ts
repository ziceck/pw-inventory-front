/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemService } from '@services/core';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const mockItem = {
    id: 1,
    name: 'Test',
    priceSale: 23.45,
    pricePurchase: 45.3,
    minimum: 40,
    dateCreated: new Date(),
    user: null,
    category: null,
    quantity: 2
  };
  let itemService: ItemService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        FormBuilder,
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clearInputSearch', () => {
    const search = component.fgSearch.get('search');
    search.patchValue('busqueda');
    component.clearInputSearch();
    const value = search.value;
    expect(value).toBeUndefined();
  });

  it('onClickOption', () => {
    const spy = spyOn<any>(component, 'emitAndClean');
    component.onClickOption(mockItem);
    expect(spy).toHaveBeenCalled();
  });

  it('emitAndClean', () => {
    component.item.subscribe(value => {
      expect(value.id === mockItem.id).toBeTrue();
    });
    component['emitAndClean'](mockItem);
  });

  it('on submit barcode', () => {
    const spy = spyOn(itemService, 'showByBarcode').and.returnValue(of(mockItem));
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

});
