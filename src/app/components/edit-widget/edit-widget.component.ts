import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import * as $ from 'jquery';
import * as jsrender from 'jsrender';


@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.css']
})
export class EditWidgetComponent {
  selectedFile!: File;
  url: string = "assets/img.jpg";
  imageFile: File;
  @ViewChild('renderTarget') renderTarget?: ElementRef;
  renderedTemplate = '';
  ckeditorContent: any;
  htmltextvalue: string = "";
  WidgetHtml: string = "";
  cssname: string = "";
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

  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageFile = e.target.files[0];
      reader.onload = (event: any) => {
        alert(event.target.result);
        this.url = event.target.result;
      }
    }
  }

  ShowPreview(cssName: string) {

    var jsonObject1: any = JSON.parse(this.updateWidgetRequest.dataSourceJson);


    const renderedHtml = jsrender.templates(this.updateWidgetRequest.WidgetHtml).render({ employees: jsonObject1 });
    localStorage.setItem('widgethtml', renderedHtml);
    //const dataToSend = { key: renderedHtml }; // Data to be sent
    //const navigationExtras: NavigationExtras = {
    //  state: {
    //    data: dataToSend
    //  }
    //};
    // alert("css= " + cssName);
    const url = this.router.createUrlTree(['/widgetpreview', '']);
    window.open(url.toString(), '_blank'); // Open in a new tab
    //this.router.navigate(['/widgetpreview', this.cssname]);

    // Insert the rendered HTML into the table container
    // this.renderedTemplate = renderedHtml;
    //const template = jsrender.templates(this.updateWidgetRequest.WidgetHtml); // Compile the template
    //this.renderedTemplate = template.render(jsonObject1); // Render the template with data
  }
}
