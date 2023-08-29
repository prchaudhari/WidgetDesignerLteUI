import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import * as $ from 'jquery';
import * as jsrender from 'jsrender';
import { AppConfig } from '../../../config';
import { Fonts } from '../../models/fonts.model ';
import { FontsService } from '../../services/fonts.service ';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.css']
})
export class EditWidgetComponent {
  wJsonData: string = "";
  wHtmlData: string = "";
  jsRenderHelp: string = "";
  selectedFile!: File;
  imagePath: string = AppConfig.imagePath;
  url: string = "";// "assets/img.jpg";
  imageFile: File;
  @ViewChild('renderTarget') renderTarget?: ElementRef;
  renderedTemplate = '';
  ckeditorContent: any;
  htmltextvalue: string = "";
  WidgetHtml: string = "";
  cssname: string = "";
  options: Fonts[] = [];
  selectedValue: string = '';
  selectedOption: string = '';
  public searchValue: any;
  updateWidgetRequest: Widget = {
    id: 0,
    widgetName: '',
    description: '',
    dataSourceJson: '',
    widgetHtml: '',
    widgetCSS: '',
    widgetCSSUrl: '',
    widgetIconUrl: '',
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
    private fontsService: FontsService,
    private route: ActivatedRoute
  ) {
    this.wJsonData = '[{"name":"Amit","balance":"10000","Address":{"Line1":"Address Line1","Line2":{"city":"Mumbai","state":"Maharashtra"}},"src":"assets/img.jpg"},{"name":"Jay","balance":"20000","Address":{"Line1":"JAy Address Line11","Line2":"Jay Address Line2"}}]';
    this.wHtmlData = '<div>Name: - {{:name}}<br />DOB: - {{:dob}}<br />Gender:-{{:gender}}<br/>Address: - {{:Address.Line1}}<br/>{{:Address.Line2.city}}<br />{{:Address.Line2.state}}<br /></div>';
    this.jsRenderHelp = '{{}} - render tag <br />\
{{:Data}} or {{>Data}} - 2 different ways to access data  <br />\
{{for}}...{{/for}} - for loop  <br /> \
{{if condition..}} ....{{//if}} <br />\
{{:~functionName(param1,param2,...)}} - helper function';

  }
  ngOnInit(): void {
    this.fontsService.getAllFonts().subscribe(options => {
      this.options = options;
    });
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.widgetService.getWidget(Number(id)).subscribe({
            next: (widget) => {
              this.updateWidgetRequest = widget;
              this.url = this.imagePath + widget.widgetIconUrl;
            },
          });
        }
      },
    });
  }
  updateWidget() {
    const formData = new FormData();
    formData.append('widgetName', this.updateWidgetRequest.widgetName);
    formData.append('description', this.updateWidgetRequest.description);
    formData.append('dataSourceJson', this.updateWidgetRequest.dataSourceJson);
    formData.append('WidgetHtml', this.updateWidgetRequest.widgetHtml);
    formData.append('dataBindingJsonNode', this.updateWidgetRequest.dataBindingJsonNode);
    formData.append('fontName', this.updateWidgetRequest.fontName);
    formData.append('width', this.updateWidgetRequest.width.toString());
    formData.append('height', this.updateWidgetRequest.height.toString());
    formData.append('startCol', this.updateWidgetRequest.startCol.toString());
    formData.append('startRow', this.updateWidgetRequest.startRow.toString());
    formData.append('WidgetIconUrl', this.imageFile);

    this.widgetService
      .updateWidget(this.updateWidgetRequest.id, formData)
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
        this.url = event.target.result;
      }
    }
  }

  selectValue(name: string) {
    this.selectedValue = name;
  }

  ShowPreview(cssName: string) {
    var previewWidgetHtml: string = "";
    var jsonObject1: any = JSON.parse(this.updateWidgetRequest.dataSourceJson);
    var tagname: string = "abc";
    previewWidgetHtml = "{{for " + tagname + "}}" + this.updateWidgetRequest.widgetHtml;
    previewWidgetHtml = previewWidgetHtml + "{{/for}}";
    const renderedHtml = jsrender.templates(previewWidgetHtml).render({ [tagname]: jsonObject1 });

    // var jsonObject1: any = JSON.parse(this.updateWidgetRequest.dataSourceJson);


    // const renderedHtml = jsrender.templates(this.updateWidgetRequest.widgetHtml).render({ abc: jsonObject1 });
    localStorage.setItem('widgethtml', renderedHtml);
    const url = this.router.createUrlTree(['/widgetpreview', '']);
    window.open(url.toString(), '_blank');
  }
}
