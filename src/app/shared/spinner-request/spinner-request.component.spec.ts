import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerRequestComponent } from './spinner-request.component';

describe('SpinnerRequestComponent', () => {
  let component: SpinnerRequestComponent;
  let fixture: ComponentFixture<SpinnerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
