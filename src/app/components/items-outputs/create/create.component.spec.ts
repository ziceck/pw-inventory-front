/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemOutputService } from '@services/core';
import { ErrorStateMatcherService } from '@services/error';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [
        FormBuilder,
        ItemOutputService,
        ErrorStateMatcherService,
        HttpClient,
        MatSnackBar,
        Overlay
      ],
      imports: [
        RouterTestingModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('on item', () => {
    component.onItem({
      category: undefined,
      dateCreated: undefined,
      minimum: 0,
      name: '',
      pricePurchase: 0,
      priceSale: 0,
      user: undefined,
      id: 1,
      quantity: 2
    });
    expect(component.item).toBeTruthy();
  });

  it('redirect to index of item outputs', () => {
    const spy = spyOn(component['router'], 'navigate').and.resolveTo(true);
    component['redirectIndex']();
    expect(spy).toHaveBeenCalled();
  });

});
