// Import necessary modules and libraries
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { GridStack, GridStackOptions } from "gridstack";

import { PagesService } from '../../services/pages.service';
import { Location } from '@angular/common';

import { GridStackWidget } from "gridstack/dist/types";

// Define the GridMode type
type GridMode = "edit" | "view";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit, AfterViewInit {

  // Initialize variables
  widget: Widget[] = [];
  getState: any = ""; // Initialize getState

  widgetsItems: any = "";
  pageHtml: any = "";
  modifynode: any = "";
  widgetsItemsArr: any = [];
  pageHtml1: any = "";



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
  }

  ngAfterViewInit(): void {
    // Initialize GridStack after the view has been initialized
    this.grid = GridStack.init(this.gridStackOptions);
    this.grid.enableMove(true);
    this.grid.enableResize(true);
    
  }

  ngOnInit(): void {
    // Initialize logic on component initialization
    this.widgetService.getAllWidget().subscribe({
      next: (widget) => {
        this.widget = widget;
        //console.log(this.widget[0].widgetName);
      },
      error: (response) => {
        //console.log(response);
      },
    });

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

  //  var grid = $('.grid-stack').data('gridstack');
    var html = '<div>'
    html += '<div class="grid-stack-item-content">';
    html += '<div class="col-md-3"> <label> Sample Textbox </label></div>';
    html += '<div class="col-md-9"> <input type="text" class="form-control" /> </div>';
    html += '</div></div>';

    

   // advGrid.addWidget(html, { w: 3 ,h:4})
    advGrid.addWidget({ x: 0, y: 0, minW: 1, content: 'Item d' })
   

    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      
      
      
    
      scroll: false,
      appendTo: 'body',
      helper: 'clone'
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
      dataSourceJson: this.getState.dataSourceJson.toString()??"",
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
