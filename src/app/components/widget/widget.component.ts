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

  deleteWidget(id: string) {
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
