import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from '../../models/pages.model';
import { PageModel } from '../../models/pagesmodel.model';
import { PageWidgetsDetails } from '../../models/pagewidgetsdetails.model'
import { Widget } from '../../models/widget.model';
import { PagesService } from '../../services/pages.service';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-edit-page-wizard1',
  templateUrl: './edit-page-wizard1.component.html',
  styleUrls: ['./edit-page-wizard1.component.css']
})
export class EditPageWizard1Component implements OnInit {
  updatePageRequest: Pages = {
    id: 0,
    pageName: '',
    description: '',
    dataSourceJson: '',
    pageHtml: '',
    pageCSSUrl: ''
  };
  widget: Widget[] = [];
  constructor(
    private pageService: PagesService,
    private router: Router,
    private route: ActivatedRoute,
    private widgetService: WidgetService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.pageService.getPage(Number(id)).subscribe({
            next: (page) => {
              this.updatePageRequest = page;
            },
          });
        }
      },
    });
  }

  // Function to add a new page and navigate to the addpage route
  addPage(formValue: any): void {

    // Initialize logic on component initialization
    this.widgetService.getAllWidget().subscribe({
      next: (widget) => {
        this.widget = widget;
        var length = { "length": this.widget.length };
        var param = Object.assign(formValue, this.widget, length);

        // Navigate to the 'pages/addpage' route with formValue as state data
        this.router.navigate(['pages/editpage'], { state: param });
      },
      error: (response) => {
        //console.log(response);
      },
    });




  }
 
}
