import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwOptionComponent } from './pw-option.component';

describe('PwOptionComponent', () => {
  let component: PwOptionComponent;
  let fixture: ComponentFixture<PwOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
