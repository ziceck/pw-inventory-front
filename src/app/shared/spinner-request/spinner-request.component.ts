import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@services/spinner';

/**
 * This component is used to show a spinner while a request finalize.
 */
@Component({
  selector: 'app-spinner-request',
  templateUrl: './spinner-request.component.html',
  styleUrls: ['./spinner-request.component.scss']
})
export class SpinnerRequestComponent implements OnInit {

  constructor(public loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

}
