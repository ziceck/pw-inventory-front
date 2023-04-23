/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { ItemService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginService } from '@services/security';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { jwt } from '@mocks/constants-mocks';

describe('ItemsIndexComponent', () => {

  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      providers: [
        ItemService,
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay,
        MatDialog,
        LoginService,
        provideMockStore({})
      ],
      imports: [
        HttpClientModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    spyOn(component['loginService'].storageService, 'getCurrentUser').and.callFake(() => jwt);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('add should be visible', () => {
    spyOnProperty(component, 'isAdmin').and.returnValue(true);
    fixture.detectChanges();
    const addButton = document.getElementById('add-item-button');
    expect(addButton).toBeTruthy();
  });

  it('add should be not visible', () => {
    spyOnProperty(component, 'isAdmin').and.returnValue(false);
    fixture.detectChanges();
    const addButton = document.getElementById('add-item-button');
    expect(addButton).toBeFalsy();
  });

});
