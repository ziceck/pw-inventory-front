/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditComponent } from './create-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '@services/core';
import { NotificationService } from '@services/notifications';
import { MaterialModule } from '@material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { itemReducer } from '../../../store/item.reducer';
import { DebugElement } from '@angular/core';
import { ItemServiceMockup } from '@mocks/services-mocks';
import { activatedRouteMockUp } from '@mocks/constants-mocks';

describe('Component is create', () => {
  let component: CreateEditComponent;
  let fixture: ComponentFixture<CreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateEditComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({items: itemReducer})
      ],
      providers: [
        ItemService,
        NotificationService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid form', () => {
    expect(component.fgItem.invalid).toBeTruthy();
  });

  it('should be crate', () => {
    expect(component.title).toEqual('Registrar Producto');
  });
});

describe('component is edit', () => {
  let component: CreateEditComponent;
  let fixture: ComponentFixture<CreateEditComponent>;
  let debugElement: DebugElement;
  let itemService: ItemService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateEditComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({items: itemReducer})
      ],
      providers: [
        {
          provide: ItemService, useClass: ItemServiceMockup
        },
        NotificationService,
        activatedRouteMockUp
      ]
    }).compileComponents();
  })
  ;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    itemService = TestBed.inject(ItemService);
  });

  it('should be edit', () => {
    expect(component.title).toEqual('Editar Producto');
  });

  it('form group item is valid', () => {
    expect(component.fgItem.valid).toBeTruthy();
  });

  it('can deactivate', () => {
    component.submitted = true;
    expect(component.canDeactivate()).toBeTrue();
  });

  it('redirect to index of items', () => {
    const spy = spyOn(component['router'], 'navigate').and.resolveTo(true);
    component['redirectIndex']();
    expect(spy).toHaveBeenCalled();
  });

});
