/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { UserService } from '@services/security';
import { users } from '@mocks/constants-mocks';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      providers: [
        UserService,
        MatSnackBar,
        Overlay,
        provideMockStore({}),
      ],
      imports: [
        MaterialModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayed columns is correct', () => {
    expect(component.displayedColumns.length).toBe(4);
  });

  it('get users should call index', () => {
    const service = TestBed.inject(UserService);
    const spy = spyOn(service, 'index').and.returnValue(of(users));
    component['getUsers']();
    expect(spy).toHaveBeenCalled();
  });
});
