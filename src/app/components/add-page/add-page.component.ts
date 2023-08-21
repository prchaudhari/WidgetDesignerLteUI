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
    cellHeight: 108
  };

  mode: GridMode = "edit";
  items: GridStackWidget[] = [];
  time: Date;
  grid: GridStack;

  constructor(
    private pagesService: PagesService,
    private widgetService: WidgetService,
    private location: Location,
    private router: Router
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
    const advGrid = GridStack.init({
      margin: 5,
      acceptWidgets: true,
      removable: '#trash',
      animate: true,
      draggable: {
        handle: '.grid-stack-item-content'
      }
    }, '#advanced-grid')
      .load(advanced);

    advGrid.enableMove(true);
    advGrid.enableResize(true);

    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      scroll: false,
      appendTo: 'body',
      helper: 'clone'
    });
  }


  // Function to save and update page widget content

  showPreview() {
    this.router.navigate(['pagepreview']);
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
        "width": node.getAttribute("gs-w"),
        "height": node.getAttribute("gs-h"),
        "startCol": node.getAttribute("gs-y"),
        "startRow": node.getAttribute("gs-x")
      };
      this.widgetsItemsArr.push(obj);
    });

    // Create data object to save
    const data = {
      id: '0',
      pageName: this.getState.pageName,
      description: this.getState.description,
      dataSourceJson: this.getState.dataSourceJson.toString(),
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
