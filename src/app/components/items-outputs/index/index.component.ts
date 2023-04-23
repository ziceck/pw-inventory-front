import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemOutput } from '@models/core';
import { ItemOutputService } from '@services/core';

/**
 * This component shows all items outputs in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ItemOutput>();

  constructor(
      private itemOutputService: ItemOutputService
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getItemsOutputs();
  }

  /**
   * Assign paginator to dataSource.
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
      'item-name',
      'quantity',
      'description',
      'date'
    ];
  }

  /**
   * Get all item outputs from API and load in datasource.
   */
  private getItemsOutputs(): void {
    this.itemOutputService.index().subscribe(itemsOutputs => {
      this.dataSource.data = itemsOutputs;
    });
  }


}
