import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Sale } from '@models/core';
import { catchError, tap } from 'rxjs/operators';
import { Ticket } from '@models/reports';
import { CommonService } from '@services/common/common.service';

/**
 * This service is used to send requests about sale.
 */
@Injectable({
  providedIn: 'root'
})
export class SaleService extends CommonService<Sale> {

  private readonly URL_SALES;

  constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_SALES = environment.URL_API + 'v1/sales/';
  }
  get fullUrl(): string {
    return this.URL_SALES;
  }

  /**
   * Send a request to generate a ticket.
   * @param ticket Ticket you want to generate.
   */
  ticket(ticket: Ticket): Observable<Ticket> {
    const configuration = JSON.parse(localStorage.getItem('configuration'));
    const params = new HttpParams({
      fromObject: {
        printTicket: configuration ? configuration.ticket.printTicket : 'false',
        showDialog: configuration ? configuration.ticket.showDialog : 'false'
      }
    });
    return this.httpClient.post<Ticket>(this.URL_SALES + 'ticket', ticket, {params})
        .pipe(catchError(error => {
          this.notificationService.warning('No se imprimió el ticket');
          return throwError(error);
        }));
  }

  /**
   * Send a request to print a ticket previously generated.
   * @param saleId ID sale you want to reprint ticket.
   */
  reprintTicket(saleId: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_SALES + 'ticket/reprint/' + saleId)
        .pipe(catchError(error => {
          this.notificationService.error('No se encontró el ticket');
          return throwError(error);
        }), tap(() => {
          this.notificationService.success('Se ha enviado la impresión del ticket');
        }));
  }

}
