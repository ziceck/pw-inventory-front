import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHistoryComponent } from './item-history.component';
import { RouterModule } from '@angular/router';
import { ItemService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

describe('ItemHistoryComponent', () => {
  let component: ItemHistoryComponent;
  let fixture: ComponentFixture<ItemHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemHistoryComponent],
      providers: [
        ItemService,
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay,
        provideMockStore({})
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
