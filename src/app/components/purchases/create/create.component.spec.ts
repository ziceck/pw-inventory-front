/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { item, purchase } from '@mocks/constants-mocks';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let purchaseService: PurchaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [
        FormBuilder,
        PurchaseService,
        NotificationService,
        MatSnackBar,
        Overlay,
        HttpClient
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    purchaseService = TestBed.inject(PurchaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createFgItemPurchase', () => {
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
    const fgItemPurchase = component['createFgItemPurchase'](mockItem);
    expect(fgItemPurchase).toBeTruthy();
  });

  it('updateResource', () => {
    const spy = spyOn(component.dataSource, 'next');
    component['updateDataSource']();
    expect(spy).toHaveBeenCalled();
  });

  it('onDelete', () => {
    const spy = spyOn<any>(component, 'updateDataSource');
    component.onDelete(1);
    expect(spy).toHaveBeenCalled();
  });

  it('redirect to index of purchases', () => {
    const spy = spyOn(component['router'], 'navigate').and.resolveTo(true);
    component['redirectIndex']();
    expect(spy).toHaveBeenCalled();
  });

  it('on submit purchase', () => {
    const spy = spyOn(purchaseService, 'create').and.returnValue(of(purchase));
    component.items.push(
        component['createFgItemPurchase'](item)
    );
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

});
