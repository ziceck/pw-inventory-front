import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        NotificationService,
        MatSnackBar,
        Overlay,
        FormBuilder
      ],
      declarations: [ConfigurationComponent],
      imports: [
          MaterialModule,
          FormsModule,
          ReactiveFormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
