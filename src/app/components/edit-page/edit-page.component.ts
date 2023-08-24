
import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { GridStack, GridStackOptions } from "gridstack";

import { PagesService } from '../../services/pages.service';
import { Location } from '@angular/common';
import { GridStackWidget, GridStackNode } from "gridstack/dist/types";
import { DDElement } from "gridstack/dist/dd-element";

type GridMode = "edit" | "view";
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {
  // Initialize variables
  widget: Widget[] = [];
  getState: any = ""; // Initialize getState

  widgetsItems: any = "";
  pageHtml: any = "";
  modifynode: any = "";
  widgetsItemsArr: any = [];
  pageHtml1: any = "";
  renderedWidgets: string = "";


  // Configuration options for the GridStack layout
  private gridStackOptions: GridStackOptions = {
    disableResize: false,
    disableDrag: false,
    margin: 18,
    column: 4,
    cellHeight: 108,
    acceptWidgets: true,
    removable: '#trash',
    animate: true,
    float: true,

    draggable: {

      handle: '.grid-stack-item-content'
    },
    children: [ // or call load()/addWidget() with same data
      { x: 1, y: 0, content: 'Item 2' },
      { x: 0, y: 1, content: 'Item 3' },
    ]
  };

  mode: GridMode = "edit";
  items: GridStackWidget[] = [];
  time: Date;
  grid: GridStack;

  constructor(
    private pagesService: PagesService,
    private widgetService: WidgetService,
    private location: Location
  ) {
    this.getState = location.getState(); // Assign value to getState
    console.log("getstate" + this.getState.pageName);
    console.log(this.getState[1]);
    console.log(this.getState.length);
    var widgetdata: string = "";
    for (var i = 0; i < this.getState.length; i++) {
      widgetdata = this.assigndata(this.getState[i], widgetdata);
    }
    this.renderedWidgets = widgetdata;
    console.log("final = " + widgetdata);

  }

  assigndata(widgetd: Widget, widgetdata: string): string {

    console.log(widgetd.widgetName);
    widgetdata = widgetdata + '<div class="text-center card text-white grid-stack-item newWidget add"> \
      <div class="card-body grid-stack-item-content add" > \
        <div style="background-color:black" > \
        <span>' + widgetd.widgetName + '</span> </div> </div> </div>'

    // alert("function " + widgetdata);
    return widgetdata;

  }

  ngAfterViewInit(): void {
    // Initialize GridStack after the view has been initialized
    this.grid = GridStack.init(this.gridStackOptions);
    this.grid.enableMove(true);
    this.grid.enableResize(true);

  }

  ngOnInit(): void {
    $("#widdiv").html(this.renderedWidgets);

    // Sample data for advanced layout
    const advanced = [
      // ...
      { x: 0, y: 0, w: 4, h: 2, content: '1' },
      // ... (other items)
      { x: 10, y: 4, w: 2, h: 2, content: '11' }
    ];

    // Initialize advanced GridStack layout
    const advGrid = GridStack.init(this.gridStackOptions
      , '#advanced-grid')
      .load(advanced);

    advGrid.addWidget({ x: 0, y: 0, minW: 1, content: 'Item d' })

    advGrid.on("dropped", function (event, previousWidget, newWidget) {
      // Change the content of the dragged item while dragging

      console.log('gridstack change previousWidget : ', event);
      console.log('gridstack drag newWidget : ', newWidget);

    });

    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      scroll: false,
      appendTo: 'body',
      helper: 'clone',

    });
    advGrid.enableMove(true);
    advGrid.enableResize(true);
  }

  saveAndUpdatePageWidgetContent() {
    const items = $(".grid-stack .grid-stack-item");
    const itemsArray = Array.from(items);

    // Process each widget item
    itemsArray.forEach(node => {
      this.pageHtml += node.outerHTML;

      const obj = {
        "id": 0,
        "pageId": 0,
        "widgetId": 3,
        "width": node.getAttribute("gs-w") ?? "0",
        "height": node.getAttribute("gs-h") ?? "0",
        "startCol": node.getAttribute("gs-y") ?? "0",
        "startRow": node.getAttribute("gs-x") ?? "0"
      };
      this.widgetsItemsArr.push(obj);
    });

    // Create data object to save
    const data = {
      id: '0',
      pageName: this.getState.pageName,
      description: this.getState.description ?? "",
      dataSourceJson: this.getState.dataSourceJson.toString() ?? "",
      pageHtml: this.pageHtml ?? "",
      pageCSSUrl: this.getState.pageCSSUrl ?? "",
      widgets: this.widgetsItemsArr
    }

    // Call the addPage method from pagesService to save the data
    this.pagesService.addPage(data).subscribe({
      next: (response) => {
        alert("Data updated successfully");
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
