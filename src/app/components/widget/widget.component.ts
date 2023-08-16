import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  widget: Widget[] = [];
  clickWidget: Widget;
  url: string = "assets/sampledata1.png";
  /*url: string = "assets/sampledata1.png";*/
    constructor(
    private widgetService: WidgetService,
    private router: Router
  ) { }

   ngOnInit(): void {
    this.widgetService.getAllWidget().subscribe({
      next: (widget) => {
        this.widget = widget;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  showWidget(id:number) {
    this.widgetService.getWidget(id).subscribe({
      next: (widget1) => {
        this.clickWidget = widget1;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteWidget(id: number) {
    if (confirm("Are you sure to delete ")) {

      this.widgetService.deleteWidget(Number(id)).subscribe({
        next: (response) => {
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        }
      });
    }
  }
}
