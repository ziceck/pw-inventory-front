import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LoginService } from '@services/security';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuService } from '@services/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@material/material.module';

describe('HeaderTestComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [LoginService, MenuService, HttpClient],
      imports: [HttpClientModule, RouterTestingModule, MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
