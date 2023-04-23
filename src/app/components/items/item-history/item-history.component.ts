import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '@services/core';
import { ItemHistory } from '@models/information';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '@models/core';
import { Store } from '@ngrx/store';

/**
 * This component shows a history about an item (creation, sales, purchases, and item output)
 */
@Component({
  selector: 'app-item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.css']
})
export class ItemHistoryComponent implements OnInit, AfterViewInit {

  item: Item;
  history: ItemHistory[];
  displayedColumns: string[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dataSource = new MatTableDataSource<ItemHistory>();

  constructor(
      private store: Store<any>,
      private activatedRoute: ActivatedRoute,
      private itemService: ItemService,
      private router: Router
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.store.select('item').subscribe(
        state => {
          this.item = state;
          this.getParams();
        });
    // this.getParams();
  }

  /**
   * Get ID param in url to call getHistory.
   */
  private getParams(): void {
    this.activatedRoute.params.subscribe(params => {
      // this.item = JSON.parse(localStorage.getItem('item'));
      const id: number = +params.id;
      this.getHistory(id);
      if (!this.item) {
        this.getItem(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Configure displayed columns in mat table.
   */
  private configureDisplayedColumns(): void {
    this.displayedColumns = [
      '#',
      'type',
      'date',
      'quantity'
    ];
  }

  /**
   * Get history for an item.
   * @param itemId ID item you want to see history.
   */
  private getHistory(itemId: number): void {
    this.itemService.history(itemId).subscribe(history => {
      this.history = history;
      this.dataSource.data = history;
    }, () => this.redirectIndex());
  }

  /**
   * Sent request show item.
   * @param itemId ID item you want to show.
   */
  private getItem(itemId: number): void {
    this.itemService.show(itemId).subscribe(item => {
      this.item = item;
    });
  }

  /**
   * Redirect to index of items.
   */
  private redirectIndex(): void {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent}).then();
  }

  /**
   * Return a color for chip, green for purchases, red for sales and blue for creation.
   * @param itemHistory Item history in mat table.
   */
  backGroundChip(itemHistory: ItemHistory): string {
    if (itemHistory.type === 'Compra') {
      return 'green';
    } else if (itemHistory.type === 'Venta' || itemHistory.type === 'Baja de inventario') {
      return 'red';
    }
    return 'blue';
  }

}
