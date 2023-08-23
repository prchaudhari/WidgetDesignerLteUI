// Import necessary modules and libraries
import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { GridStack, GridStackOptions, GridItemHTMLElement } from "gridstack";

import { PagesService } from '../../services/pages.service';
import { Location } from '@angular/common';
import { GridStackWidget, GridStackNode, GridStackElement } from "gridstack/dist/types";
import { DDElement } from "gridstack/dist/dd-element";



// NOTE: local testing of file
// import { GridstackComponent, NgGridStackOptions, NgGridStackWidget, elementCB, gsCreateNgComponents, nodesCB } from './gridstack.component';
import { GridstackComponent, NgGridStackOptions, NgGridStackWidget, elementCB, gsCreateNgComponents, nodesCB } from 'gridstack/dist/angular';


// Define the GridMode type
type GridMode = "edit" | "view";


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit, AfterViewInit {


  @ViewChild(GridstackComponent) gridComp?: GridstackComponent;
  @ViewChild('origTextArea', { static: true }) origTextEl?: ElementRef<HTMLTextAreaElement>;
  @ViewChild('textArea', { static: true }) textEl?: ElementRef<HTMLTextAreaElement>;

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
    }
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
    var widgetdata: string="";
    for (var i = 0; i < this.getState.length; i++) {
      widgetdata = this.assigndata(this.getState[i],widgetdata);
    }
    this.renderedWidgets = widgetdata;
    console.log( "final = " + widgetdata);
   
  }

    assigndata(widgetd: Widget, widgetdata:string) :string {

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
  //  this.grid = GridStack.init(this.gridStackOptions);
 //   this.grid.enableMove(true);
   // this.grid.enableResize(true);
    
  }

  ngOnInit(): void {
    $("#widdiv").html(this.renderedWidgets);
    //const _ddElement = DDElement.init();
    //_ddElement.setupDraggable({
    //  handle: '.newWidget',
    //  appendTo: 'body',
    //  helper: 'clone',

    //});
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
      { x: 0, y: 0, w: 4, h: 2, content: '1', id: '1' },
      // ... (other items)
      { x: 10, y: 4, w: 2, h: 2, content: '11', id: '2' }
    ];

    // Initialize advanced GridStack layout
    const grid = GridStack.init(this.gridStackOptions
      , '#advanced-grid')
      .load(advanced);

    //  var grid = $('.grid-stack').data('gridstack');
    //var html = '<div>'
    //html += '<div class="grid-stack-item-content">';
    //html += '<div class="col-md-3"> <label> Sample Textbox </label></div>';
    //html += '<div class="col-md-9"> <input type="text" class="form-control" /> </div>';
    //html += '</div></div>';

    //grid.addWidget(html, { w: 3 ,h:4})
    //advGrid.addWidget({ x: 0, y: 0, minW: 1, content: 'Item d' })
    /*advGrid.on('dragstart', function (event, previousWidget, newWidget) {
      if (event) {


        console.log('gridstack dragstart: ', event);
        //console.log('gridstack dragstart: ', previousWidget);


        //console.log('gridstack dropped: ', newWidget);

      }
    });
*/


    //advGrid.on('dropped', this.gridStackDropped.bind(this));
    //grid.load(this.items); // and load our content directly (will create DOM)

    /* grid.on("dragstop", function (event, previousWidget, newWidget) {
        // Restore the original content when dragging stops
        console.log('gridstack dragstop: ', event.target);
  
  
      });*/

    //advGrid.on("dropped", function (event, previousWidget, newWidget) {
    //  // Restore the original content when dragging stops
    //  console.log('gridstack dragstop: ', event.target);


    //});

    //advGrid.on('change', function (event, previousWidget, newWidget) {
    //  if (previousWidget) {
    //    var movedItem = previousWidget | undefined;
    //      // Convert the GridStackNode to a GridStackElement
    //      const element: GridStackElement = {
    //        el: movedItem.el,
    //        x: movedItem.x,
    //        y: movedItem.y,
    //        w: movedItem.w,
    //        h: movedItem.h,
    //      };

    //      // Remove the widget from the GridStack layout using the converted element
    //     grid.removeWidget(element);
    //    }

    //});







   grid.on("dropped", function (event, previousWidget, newWidget) {
      // Restore the original content when dragging stops
    //  var serializedFull = grid.save(true, true);
    //  var serializedData = serializedFull;
     // console.log(serializedFull);
     // console.log(serializedData);
      var ids = 1;
      
     // this.gridComp?.grid?.addWidget({ x: 3, y: 0, w: 2, content: `item ${ids}`, id: String(ids++) });

     const widgetdata = 
       { x: 0, y: 0, w: 4, h: 2, content: 'dineshl', id: "23" };

    // widgetdata = widgetdata + '<div class="text-center card text-white grid-stack-item newWidget add id=12"> \
    //  <div class="card-body grid-stack-item-content add" id=13 > \
    //    <div style="background-color:black" > \
    //    <span>' + "dinesh33" + '</span> </div> </div> </div>';



     grid.addWidget(widgetdata);

      // Assuming you have a Gridstack instance
     // Process each widget item
   //  grid.engine.nodes.forEach(node => { console.log("hello ", node.id)
    //   });
     
     const removeEl = grid.engine.nodes.find((n) => n.id == "1")?.el;
      console.log(removeEl);
     

     // alert("heloo");
     if (removeEl) grid.removeWidget(removeEl);

      //const widgetId = '12'; // Replace with the actual ID or unique identifier of the widget
      //const widgetToRemove = document.getElementById(widgetId) as GridStackElement;

      //if (typeof widgetToRemove === 'string' || widgetToRemove instanceof HTMLElement) {
      //  // If the widget is a string (ID) or HTMLElement, remove it from the grid
      // grid.removeWidget(widgetdata);
      //} else {
      //  console.error(`Widget with ID ${widgetId} not found.`);
      //}

      // var  el = $('#divGridstackContent').closest('.grid-stack-item').children;


    


    // grid.removeWidget({ w: 3, h: 4 })
   //grid.addWidget({ x: 0, y: 0, minW: 1, content: 'Item d' })

  //   grid.removeAll();
      //var remove = previousWidget as GridItemHTMLElement| undefined;
     //grid.removeWidget(remove);
  //   grid.addWidget(widgetdata, { w: 3, h: 4 });
     //grid.removeWidget(widgetdata)
    //advGrid.addWidget({ x: 0, y: 0, minW: 1, content: 'Item d' })

     

      //const element: GridStackElement = {

      //  el: previousWidget.el as GridItemHTMLElement ,

      //  x: previousWidget.x ?? 0,

      //  y: previousWidget.y ?? 0,

      //  w: previousWidget.w ?? 1,

      //  h: previousWidget.h ?? 1,

      //};

      // Assuming you have a Gridstack instance
      //var grid = GridStack.init();

      // Identify the widget by its data attributes (x, y, width, and height)
      var widgetData = {
        x: 1,      // Replace with the actual x-coordinate of the widget
        y: 2,      // Replace with the actual y-coordinate of the widget
        width: 3,  // Replace with the actual width of the widget
        height: 4, // Replace with the actual height of the widget
      };

     
      // Remove the widget from the grid
      //advGrid.removeWidget(widgetData);

      // Remove the widget from the GridStack layout using the converted element

     //grid.removeWidget(element);


  
     
    //  var previousContent = $(previousWidget).find('.grid-stack-item-content');
     // console.log(previousContent);
      // Modify the content of the previous widget while dragging
    //  previousContent.text('Dragging...');

    });

  

    // Add event listener for dragging start
   

    // Add event listener for dragging stop
 


    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      scroll: false,
      appendTo: 'body',
      helper: 'clone',

    });

   grid.enableMove(true);
   grid.enableResize(true);


  }


  
  

 

  gridStackDropped(event: Event, previousWidget: GridStackNode, newWidget: GridStackNode): void {
    const dragEvent = event as DragEvent;
    if (dragEvent.dataTransfer) {
      console.log('gridstack dropped: ', dragEvent.dataTransfer.getData('message'));
    }
  }


  
    
  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
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
