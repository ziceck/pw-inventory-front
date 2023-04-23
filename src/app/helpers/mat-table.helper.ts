import { MatTableDataSource } from '@angular/material/table';

/**
 * This function override the way of a mat-sort in a mat-table.
 * @param dataSource Datasource you want to override sortingDataAccessor.
 */
export function overrideSortingDataAccessor(dataSource: MatTableDataSource<any>): void {
  dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
    if (typeof data[sortHeaderId] === 'string') {
      return data[sortHeaderId].toLocaleLowerCase();
    }
    return data[sortHeaderId];
  };
}
