import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '@services/common/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { overrideSortingDataAccessor } from '@helpers/mat-table.helper';

@Component({
  template: ''
})
export abstract class CommonIndexComponent<T> implements OnInit, AfterViewInit {

  indexData: T[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<T>();
  @ViewChild(MatSort) sort: MatSort;

  protected constructor(
      protected commonService: CommonService<T>
  ) {
  }

  ngOnInit(): void {
    this.getIndex();
  }

  /**
   * Init paginator and sort for mat table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    overrideSortingDataAccessor(this.dataSource);
  }

  abstract get displayedColumns(): string[];

  /**
   * Get all items from API.
   */
  private getIndex(): void {
    this.commonService.index().subscribe(indexData => {
      this.indexData = indexData;
      this.dataSource.data = this.indexData;
    });
  }

}
