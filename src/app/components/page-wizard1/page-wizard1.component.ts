// Import necessary modules and components
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-page-wizard1',
  templateUrl: './page-wizard1.component.html',
  styleUrls: ['./page-wizard1.component.css']
})
export class PageWizard1Component {
  // Initialize widget array to hold Pages data
  widget: Widget[] = [];

  constructor(
    private router: Router,
    private widgetService: WidgetService
  ) { }

  // Function to add a new page and navigate to the addpage route
  addPage(formValue: any): void {

    // Initialize logic on component initialization
    this.widgetService.getAllWidget().subscribe({
      next: (widget) => {
        this.widget = widget;
        var param = Object.assign(formValue, this.widget);
    // Navigate to the 'pages/addpage' route with formValue as state data
    this.router.navigate(['pages/addpage'], { state: param  });
      },
      error: (response) => {
        //console.log(response);
      },
    });

      

   
  }
}
