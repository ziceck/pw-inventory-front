import { Component, OnInit } from '@angular/core';
import { SaleService } from '@services/core';
import { ActivatedRoute } from '@angular/router';
import { Sale } from '@models/core';

/**
 * This component show details about a sale.
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  sale: Sale;
  displayedColumns: string[];

  constructor(
      private saleService: SaleService,
      private activatedRoute: ActivatedRoute
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getSale();
  }

  /**
   * Configure displayed columns in mat table.
   */
  private configureDisplayedColumns(): void {
    this.displayedColumns = ['#', 'name', 'quantity', 'price'];
  }

  /**
   * Get the sale you want to show details.
   */
  private getSale(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.saleService.show(id).subscribe(sale => this.sale = sale);
  }

  /**
   * This method is a short way to access to the total price of the sale.
   * @return The total price of the sale.
   */
  get total(): number {
    return this.sale?.items.reduce((a, b) => a + b.price, 0);
  }

}
