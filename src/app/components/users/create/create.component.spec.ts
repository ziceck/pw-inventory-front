/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { UserRoleService } from '@services/security/user-role.service';
import { of } from 'rxjs';
import { userRole } from '@mocks/constants-mocks';

describe('CreateEditComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [
      ],
      imports: [
          ReactiveFormsModule,
          HttpClientModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create user role should call user role create', () => {
    const service = TestBed.inject(UserRoleService);
    const spy = spyOn(service, 'create').and.returnValue(of(userRole));
    component['createUserRole'](1);
    expect(spy).toHaveBeenCalled();
  });
});
