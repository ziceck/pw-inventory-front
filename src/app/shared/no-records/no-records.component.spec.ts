import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRecordsComponent } from './no-records.component';
import { MaterialModule } from '@material/material.module';

describe('NoRecordsComponent', () => {
  let component: NoRecordsComponent;
  let fixture: ComponentFixture<NoRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoRecordsComponent ],
      imports: [MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
