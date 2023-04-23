import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from '@services/information';
import { InformationDashboard } from '@models/information';

/**
 * This component contains the dashboard of the application.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  informationDashboard: InformationDashboard;

  constructor(
      private router: Router,
      private activatedRouted: ActivatedRoute,
      private informationService: InformationService
  ) {
  }

  ngOnInit(): void {
    this.getInformationDashboard();
  }

  /**
   * Get information from API to show it in dashboard.
   */
  private getInformationDashboard(): void {
    this.informationService.dashboard().subscribe(
        informationDashboard => this.informationDashboard = informationDashboard
    );
  }

}
