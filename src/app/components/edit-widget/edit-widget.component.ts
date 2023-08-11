import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.css']
})
export class EditWidgetComponent {
  updateWidgetRequest: Widget = {
      id: 0,
      widgetName: '',
      description: '',
      dataSourceJson: '',
      WidgetHtml: '',
      widgetCSS: '',
      widgetCSSUrl: '',
      WidgetIconUrl: '',
      width: 0,
      height: 0,
      dataBindingJsonNode: '',
      fontName: '',
      startCol: 0,
      startRow: 0
  };
  constructor(
    private widgetService: WidgetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
         /*const id = parseInt('id');*/
        const id = params.get('id');
        //const idAsInteger = parseInt(id, 10);
        if (id) {
          this.widgetService.getWidget(Number(id)).subscribe({
            next: (widget) => {
              this.updateWidgetRequest = widget;
            },
          });
        }
      },
    });
  }
  updateWidget() {
    this.widgetService
      .updateWidget(this.updateWidgetRequest.id, this.updateWidgetRequest)
      .subscribe({
        next: (response) => {
          alert("data update successfully");
          this.router.navigate(['widget']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
