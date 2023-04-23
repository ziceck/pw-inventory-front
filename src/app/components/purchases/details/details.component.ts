import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '@services/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from '@models/core';

/**
 * This component show details about a purchase.
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  purchase: Purchase;
  displayedColumns: string[];

  constructor(
      private purchaseService: PurchaseService,
      private activatedRoute: ActivatedRoute
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getPurchase();
  }

  /**
   * Configure displayed columns in mat table.
   */
  configureDisplayedColumns(): void {
    this.displayedColumns = ['#', 'name', 'quantity', 'price'];
  }

  /**
   * Get the purchase you want to show details.
   */
  private getPurchase(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.purchaseService.show(id).subscribe(purchase => this.purchase = purchase);
  }

  /**
   * This method is a short way to access to the total price of the purchase.
   * @return The total price of the purchase.
   */
  get total(): number {
    return this.purchase?.items.reduce((a, b) => a + b.price, 0);
  }

}
