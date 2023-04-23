import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwNavComponent } from './pw-nav.component';

describe('PwNavComponent', () => {
  let component: PwNavComponent;
  let fixture: ComponentFixture<PwNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
