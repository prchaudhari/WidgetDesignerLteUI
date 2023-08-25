// Import necessary modules and libraries
import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { GridStack, GridStackOptions} from "gridstack";
import { PagesService } from '../../services/pages.service';
import { Location } from '@angular/common';
import { GridStackWidget,  } from "gridstack/dist/types";
import * as jsrender from 'jsrender';





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
  renderedWidgets: string = "";


  // Configuration options for the GridStack layout
  private gridStackOptions: GridStackOptions = {
    disableResize: true,
    disableDrag: true,
    margin: 1,
    column: 1,
    cellHeight:50 ,
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
    private location: Location,
    private router: Router
  ) {
    this.getState = location.getState(); // Assign value to getState
    console.log("getstate" + this.getState);
   // console.log("getstate" + this.getState.dataSourceJson);
  //  console.log(this.getState[1]);
  //  console.log(this.getState.length);
    var widgetdata: string="";
    for (var i = 0; i < this.getState.length; i++) {
      widgetdata = this.assigndata(this.getState[i],widgetdata);
    }
    this.renderedWidgets = widgetdata;
    console.log( "final = " + widgetdata);
   
  }

    assigndata(widgetd: Widget, widgetdata:string) :string {

   //   console.log(widgetd.widgetName);
      widgetdata = widgetdata + '<div class="text-center card text-white grid-stack-item newWidget"  gs-id="' + widgetd.id +'"> \
      <div class="card-body grid-stack-item-content add" > \
        <div style="background-color:black" > \
        <span>' + widgetd.widgetName + '</span> </div> </div> </div>'
   
   // alert("function " + widgetdata);
    return widgetdata;
   
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    $("#widdiv").html(this.renderedWidgets);

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
     { x: 0, y: 0, w: 0, h: 0,  id: 'undefined' }
      // ... (other items)
     
    ];

    // Initialize advanced GridStack layout
    const grid = GridStack.init(this.gridStackOptions
      , '#advanced-grid')
      .load(advanced);

    grid.on("dropped",  (event, previousWidget, newWidget) => {
      // Restore the original content when dragging stops
    //  var serializedFull = grid.save(true, true);
    //  var serializedData = serializedFull;
     // console.log(serializedFull);
     // console.log(serializedData);

      for (var i = 0; i < this.getState.length; i++) {
        if (this.getState[i].id == newWidget.id) {
          var widgetHtml = this.getState[i].widgetHtml;
          var dataBindingJsonNode = this.getState[i].dataBindingJsonNode;
         var dataSourceJson = this.getState[i].dataSourceJson;
          break;
        };
      }
     // console.log("full json" + this.getState)
      console.log( this.getState)
      var jsonObject1: any = JSON.parse(dataSourceJson);
   //   var tagname: string = dataBindingJsonNode;
      var tagname: string = "abc";
      var widgetHtmlAppend = "{{for " + tagname + "}}" + widgetHtml;
       widgetHtmlAppend +=  "{{/for}}";
      const renderedHtml = jsrender.templates(widgetHtmlAppend).render({ [tagname]: jsonObject1 });
     
     // console.log( this.getState[0]);
     const removeEl = grid.engine.nodes.find((n) => n.id == newWidget.id)?.el;
   //  console.log(removeEl);
     // alert("heloo");
     if (removeEl) grid.removeWidget(removeEl);
     const widgetdata = 
       { content: renderedHtml, id: newWidget.id + "g", scroll: false, overflow:"hidden" };
     grid.addWidget(widgetdata);

    

    });

  


    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      scroll: false,
      appendTo: 'body',
      helper: 'clone',

    });

   grid.enableMove(true);
   grid.enableResize(true);


  }

  previewPage() {

    const items = $(".grid-stack .grid-stack-item");
    const itemsArray = Array.from(items);
    // Process each widget item
    itemsArray.forEach(node => {
    //  this.pageHtml += node.innerHTML;
      this.pageHtml += node.outerHTML;
    });
    localStorage.setItem('pagehtml', this.pageHtml);
    const url = this.router.createUrlTree(['/pagepreview', '']);
    window.open(url.toString(), '_blank'); 

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
