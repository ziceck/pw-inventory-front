import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseService } from '@services/core';
import { ItemPurchase, Purchase } from '@models/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { paginationIdDesc } from '@models/pagination';

/**
 * This component show all purchases in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Purchase>();

  constructor(private purchaseService: PurchaseService) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getPurchases();
  }

  /**
   * Assign the paginator to the dataSource.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Configure displayed columns in mat table.
   */
  private configureDisplayedColumns(): void {
    this.displayedColumns = [
      '#',
      'description',
      'price',
      'date-created',
      'options'
    ];
  }

  /**
   * Get all purchases from API and load in datasource.
   */
  private getPurchases(): void {
    this.purchaseService.index(paginationIdDesc).subscribe(purchases => this.dataSource.data = purchases);
  }

  /**
   * This method get the total price of a purchase.
   * @param items All items purchased.
   */
  totalPurchase(items: ItemPurchase[]): number {
    return items.reduce((a, b) => a + b.price, 0);
  }

}
