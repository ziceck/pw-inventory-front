import { TestBed } from '@angular/core/testing';
import { MenuService } from '@services/menu/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '@services/security';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        LoginService
      ]
    });
  });
  // beforeAll();
  it('should be created', () => {
    // const service: MenuService = TestBed.inject(MenuService);
    const service: MenuService = TestBed.inject(MenuService);
    expect(service).toBeTruthy();
  });

  it('token', () => {
    expect(true).toBeTruthy();
  });

});
