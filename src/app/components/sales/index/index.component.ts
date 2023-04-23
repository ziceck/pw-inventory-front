import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SaleService } from '@services/core';
import { ItemSale, Sale } from '@models/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination, paginationIdDesc } from '@models/pagination';

/**
 * This component show all sales in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Sale>();

  constructor(
      private saleService: SaleService
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getSales();
  }

  /**
   * Assign the paginator to the data source.
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
   * Get all sales from API and load in datasource.
   */
  private getSales(): void {
    this.saleService.index(paginationIdDesc).subscribe(sales => this.dataSource.data = sales);
  }

  /**
   * This method get the total price of a sale.
   * @param items All items sold.
   */
  totalSale(items: ItemSale[]): number {
    return items.reduce((a, b) => a + b.price, 0);
  }

  /**
   * This method is called when you click on reprint ticket option.
   * @param saleId The ID of the sale you want to reprint the ticket.
   */
  reprint(saleId: number): void {
    this.saleService.reprintTicket(saleId).subscribe();
  }

}
