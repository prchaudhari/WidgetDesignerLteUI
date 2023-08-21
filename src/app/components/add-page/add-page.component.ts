import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { GridStack, GridStackOptions } from "gridstack";

import { GridStackWidget } from "gridstack/dist/types";

type GridMode = "edit" | "view";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit, AfterViewInit {
 
  widget: Widget[] = [];
  //newPage: Page = {
  //  id: 0,
  //  widgetName: '',
  //  description: '',
  //  dataSourceJson: '',
  //  widgetHtml: '',
  //  widgetCSS: '',
  //  widgetCSSUrl: '',
  //  widgetIconUrl: '',
  //  width: 0,
  //  height: 0,
  //  dataBindingJsonNode: '',
  //  fontName: '',
  //  startCol: 0,
  //  startRow: 0,
  //};
  constructor(
    private widgetService: WidgetService,
    private router: Router
  ) { }

  private gridStackOptions: GridStackOptions = {
    disableResize: false,
    disableDrag: false,
    margin: 18,
    column: 4,
    cellHeight: 108
  };

  mode: GridMode = "edit";
  items: GridStackWidget[] = [];
  time: Date;
  grid: GridStack;


  ngAfterViewInit(): void {
    this.grid = GridStack.init(this.gridStackOptions);
  }

  ngOnInit(): void {
    // Your initialization logic
    this.widgetService.getAllWidget().subscribe({
      next: (widget) => {
        this.widget = widget;
        console.log(this.widget[0].widgetName);
      },
      error: (response) => {
        console.log(response);
      },
    });
    const advanced = [
      { x: 0, y: 0, w: 4, h: 2, content: '1' },
      { x: 4, y: 0, w: 4, h: 2, content: '2' },
      { x: 8, y: 0, w: 2, h: 2, content: '3' },
      { x: 10, y: 0, w: 2, h: 2, content: '4' },
      { x: 0, y: 2, w: 2, h: 2, content: '5' },
      { x: 2, y: 2, w: 2, h: 4, content: '6' },
      { x: 8, y: 2, w: 4, h: 2, content: '7' },
      { x: 0, y: 4, w: 2, h: 2, content: '8' },
      { x: 4, y: 4, w: 4, h: 2, content: '9' },
      { x: 8, y: 4, w: 2, h: 2, content: '10' },
      { x: 10, y: 4, w: 2, h: 2, content: '11' }
    ];

    const advGrid = GridStack.init({
     margin: 5,
      acceptWidgets: true,// acceptWidgets - accept widgets dragged from other grids or from outside (default: false).
     
      removable: '#trash', // drag-out delete class
      animate: true, // You can customize options based on your requirements
      draggable: {
        handle: '.grid-stack-item-content' // Use your specific handle class here

      }

    }, '#advanced-grid')
      .load(advanced);

  

    GridStack.setupDragIn('.newWidget', {  scroll: false, appendTo: 'body', helper: 'clone' });



   


  }

  showPreview() {
    this.router.navigate(['pagepreview']);
  }

  saveAndUpdatePageWidgetContent() {
    
  //  const formData = new FormData();
  //  formData.append('widgetName', this.updateWidgetRequest.widgetName);
  //  formData.append('description', this.updateWidgetRequest.description);
  //  formData.append('dataSourceJson', this.updateWidgetRequest.dataSourceJson);
  //  formData.append('WidgetHtml', this.updateWidgetRequest.widgetHtml);
  //  formData.append('dataBindingJsonNode', this.updateWidgetRequest.dataBindingJsonNode);
  //  formData.append('fontName', this.updateWidgetRequest.fontName);
  //  formData.append('width', this.updateWidgetRequest.width.toString());
  //  formData.append('height', this.updateWidgetRequest.height.toString());
  //  formData.append('startCol', this.updateWidgetRequest.startCol.toString());
  //  formData.append('startRow', this.updateWidgetRequest.startRow.toString());
  //  formData.append('WidgetIconUrl', this.imageFile);

  //  this.widgetService
  //    .updateWidget(this.updateWidgetRequest.id, formData)
  //    .subscribe({
  //      next: (response) => {
  //        alert("data update successfully");
  //        this.router.navigate(['widget']);
  //      },
  //      error: (error) => {
  //        console.log(error);
  //      },
  //    });
  }

 

}
