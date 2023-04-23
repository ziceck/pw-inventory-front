/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        MaterialModule
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter
        }
      ],
      declarations: [
        AppComponent,
        SpinnerComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have as title inventarios-front', () => {
    expect(app.title).toEqual('Inventario');
  });

  it('setTitle', () => {
    // router.events = of( new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
    app['setTitle']();
    expect(app.title).toEqual('Inventario');
  });

  /*it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    console.log(compiled.querySelector('.content span').textContent);
    expect(compiled.querySelector('.content span').textContent).toContain('inventarios-front app is running!');
  });*/
});

export class MockRouter {
  public events = of(new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
  // tslint:disable-next-line:only-arrow-functions
  routerState = function(): any {
    return {root: undefined};
  };
}
