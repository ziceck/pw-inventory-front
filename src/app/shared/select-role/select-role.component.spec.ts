/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoleComponent } from './select-role.component';
import { RoleService } from '@services/security/role.service';
import { of } from 'rxjs';
import { roles } from '@mocks/.';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectRoleComponent', () => {
  let component: SelectRoleComponent;
  let fixture: ComponentFixture<SelectRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRoleComponent],
      providers: [
        RoleService,
      ],
      imports: [
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoleComponent);
    component = fixture.componentInstance;
    // test fail if form control is not initialized
    component.formControl = new FormControl(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get roles should call index', () => {
    const service = TestBed.inject(RoleService);
    const spy = spyOn(service, 'index').and.returnValue(of(roles));
    component['getRoles']();
    expect(spy).toHaveBeenCalled();
  });
});
