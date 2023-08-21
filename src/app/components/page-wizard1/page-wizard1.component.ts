// Import necessary modules and components
import { Component } from '@angular/core';
import { Pages } from '../../models/pages.model';
import { PagesService } from '../../services/pages.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-wizard1',
  templateUrl: './page-wizard1.component.html',
  styleUrls: ['./page-wizard1.component.css']
})
export class PageWizard1Component {
  // Initialize widget array to hold Pages data
  widget: Pages[] = [];

  constructor(
    private http: HttpClient,
    private pagesService: PagesService, // Renamed PagesService
    private router: Router
  ) { }

  // Function to add a new page and navigate to the addpage route
  addPage(formValue: any): void {
    // Navigate to the 'pages/addpage' route with formValue as state data
    this.router.navigate(['pages/addpage'], { state: formValue });
  }
}
