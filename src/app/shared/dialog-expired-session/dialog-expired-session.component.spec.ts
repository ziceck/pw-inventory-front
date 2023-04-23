import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExpiredSessionComponent } from './dialog-expired-session.component';
import { ExpiredSessionService } from '@services/notifications';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogExpiredSessionComponent', () => {

  let component: DialogExpiredSessionComponent;
  let fixture: ComponentFixture<DialogExpiredSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogExpiredSessionComponent],
      providers: [
        ExpiredSessionService,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExpiredSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
