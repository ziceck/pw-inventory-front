import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { PurchaseService } from '@services/core/purchase.service';

describe('PurchaseService', () => {

  let purchaseService: PurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [HttpClientModule]
    });

    purchaseService = TestBed.inject(PurchaseService);
  });

  it('should be created', () => {
    expect(purchaseService).toBeTruthy();
  });

});
