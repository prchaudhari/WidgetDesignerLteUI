// Import necessary modules and libraries
import {  Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { GridStack, GridStackOptions } from "gridstack";
import { PagesService } from '../../services/pages.service';
import { Location } from '@angular/common';
import { GridStackWidget, GridStackElement } from "gridstack/dist/types";
import * as jsrender from 'jsrender';
import { PageWidgetsDetailsModel } from '../../models/pagewidgetsdetailsmodel.model';
import { PageModel } from '../../models/pagesmodel.model';
import { PageWidgetsDetails } from '../../models/pagewidgetsdetails.model';
// Define the GridMode type
type GridMode = "edit" | "view";


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  ReadMore: boolean = true
  visible: boolean = true
  // Initialize variables
  widget: Widget[] = [];
  getState: any = ""; // Initialize getState

  widgetsItems: any = "";
  pageHtml: any = "";
  modifynode: any = "";
  renderedWidgets: string = "";
  FullJsonDataObject: string = "";
  displayJson: string = "";
  editPageId : number ;

  // Configuration options for the GridStack layout
  private gridStackOptions: GridStackOptions = {
    disableResize: false,
    disableDrag: false,
    margin: 0,
    column: 400,
    //  cellHeight: 50,
    acceptWidgets: true,
    removable: '#trash',
    animate: true,
    float: true,

    draggable: {
      handle: '.grid-stack-item-content'
    }
    ,
    resizable: { handles: 'all' } // do all sides for testing
  };

  mode: GridMode = "edit";
  time: Date;
  grid: GridStack;
  cssname: string = "cssTheme1";
  cssNameWithPath: string;
  searchTerm: string = '';
  allWidgets: Widget[] = [];
  filteredWidgets: Widget[] = [];
  anyClassx: any = {};
  anyClassgrid: any = {};
  maingrid: any = {};  
  constructor(
    private pagesService: PagesService,
    private widgetService: WidgetService,
    private location: Location,
    private router: Router
  ) {

    this.getState = location.getState(); // Assign value to getState
    // console.log("getstate" + this.getState);
    // console.log("getstate" + this.getState.dataSourceJson);
    //  console.log(this.getState[1]);
    //  console.log(this.getState.length);
    this.allWidgets = [];
    var widgetdata: string = "";
    for (var i = 0; i < this.getState.length; i++) {
      widgetdata = this.assigndata(this.getState[i], widgetdata);
    }
    this.renderedWidgets = widgetdata;
    //  console.log("final = " + widgetdata);
    this.FullJsonDataObject = this.FullJsonDataObject;// + "{";

    this.editPageId = Number(localStorage.getItem('editPageId'));
  }

  assigndata(widgetd: Widget, widgetdata: string): string {
    this.allWidgets.push(widgetd);
    //  console.log(widgetd.fontName);
    widgetdata = widgetdata + '<div class="card text-white grid-stack-item newWidget" style=" margin-bottom:3px;"  gs-id="' + widgetd.id + '"> \
      <div class="card-body grid-stack-item-content add" style="padding:5px;border:1px solid grey"> \
        <div style="overflow: hidden; width:150px; white-space: nowrap; text-overflow: ellipsis;" title="' + widgetd.widgetName + '"><i class="' + widgetd.fontName + '"> </i> ' + widgetd.widgetName + '</div> </div> </div>  ';

    //<span style="width: 100%" class="info-box-icon"><i [ngClass]="' + widgetd.fontName+'"></i></span>
    // alert("function " + widgetdata<i [ngClass]="widget.fontName"></i>
    return widgetdata;

  }

  ngOnInit(): void {
    let pagewt: string = (Number(this.getState.pageWidth)).toString() + 'px';
    let pageht: string = (Number(this.getState.pageHeight)).toString() + 'px';
    this.anyClassx = {
      'width': pagewt,
      'height': pageht
    };
    this.anyClassgrid = {
      'width': '1260px', /* Width of the visible portion */
      'overflow-x': 'auto', /* Enable horizontal scrolling */
      /* 'background-color': 'aqua'*/
    };
    this.maingrid = {
      'width': pagewt,
      //'height': pageht
    }

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

    // Initialize advanced GridStack layout
    const grid = GridStack.init(this.gridStackOptions
      , '#edit-advanced-grid');

    this.pagesService.getPage(this.editPageId).subscribe({
      next: (page) => {
        console.log(page.pageCSSUrl);
        this.widgetService.getPageWidgets(this.editPageId).subscribe({
          next: (response) => {
            //  console.log(response);
            if (response !== null) {
              //console.log(response);
              response.forEach((widgetData: any) => {

                this.widgetService.getWidget(widgetData.widgetId).subscribe({
                  next: (widgetDataResponse) => {

                    /*****************/
                    var isPropertyPresent: boolean = false;

                    if (this.FullJsonDataObject == "") {
                      this.FullJsonDataObject += "{"
                    }
                    else {
                      var fulljsonObject: any = JSON.parse(this.FullJsonDataObject + "}");
                      isPropertyPresent = fulljsonObject.hasOwnProperty(widgetDataResponse.dataBindingJsonNode);
                      //alert(isPropertyPresent);
                      if (!isPropertyPresent) {
                        this.FullJsonDataObject += ","
                      }
                    }
                    if (!isPropertyPresent) {
                      this.FullJsonDataObject += '"' + widgetDataResponse.dataBindingJsonNode + '":';
                      this.FullJsonDataObject += widgetDataResponse.dataSourceJson;
                    }
                    this.displayJson = JSON.parse(this.FullJsonDataObject + "\n}");
                    /******************/
                    //  console.log("asdas----" + this.FullJsonDataObject);
                    // console.log("full json" + this.getState)
                    //   console.log( this.getState)

                    var jsonObject1: any = JSON.parse(widgetDataResponse.dataSourceJson);
                    let widgetHtml = widgetDataResponse.widgetHtml;

                    //   var tagname: string = dataBindingJsonNode;
                    var tagname: string = "abc";
                    var widgetHtmlAppend = "{{for " + tagname + "}}" + widgetHtml;
                    widgetHtmlAppend += "{{/for}}";
                    let renderedHtml = jsrender.templates(widgetHtmlAppend).render({ [tagname]: jsonObject1 });




                    //let newWidget = { x: widgetData.startRow, y: widgetData.startCol, w: widgetData.width, h: widgetData.height, content: renderedHtml, id: widgetData.widgetId + "0" };
                    let newWidget = { x: widgetData.startRow, y: widgetData.startCol, w: widgetData.width, h: widgetData.height, content: renderedHtml, id: widgetData.widgetId + "0" };

                    grid.addWidget(newWidget);
                    if (page.pageCSSUrl) {
                      this.cssname = page.pageCSSUrl;
                    }
                    let fileRef;
                    fileRef = document.createElement('link');
                    fileRef.setAttribute('rel', 'stylesheet');
                    fileRef.setAttribute('type', 'text/css');
                    this.cssNameWithPath = "assets/dynamicThemes/" + this.cssname + ".css";
                    fileRef.setAttribute('href', '../../' + this.cssNameWithPath);
                    if (typeof fileRef !== 'undefined') {
                      document.getElementsByTagName('head')[0].appendChild(fileRef);
                    }
                    localStorage.setItem('fileRefCssName', this.cssname);
                  },
                  error: (error) => {

                    console.log(error);
                  },
                });



              });
            } else {
              // Handle the case where '(response' in localStorage is null
              alert("No data found.")
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
        
      },
    });


    grid.on("resize", (event, previousWidget, newWidget) => {


      //console.log(previousWidget);

      //console.log(newWidget);


      //const items = $(".grid-stack .grid-stack-item .grid-stack-item-content");
      //items.each(function () {
      //  $(this).addClass('zoomed');
      //});

      //const items1 = $(".grid-stack .grid-stack-item .grid-stack-item-content .divdemo");
      //items1.each(function () {
      //  $(this).addClass('zoomed');
      //});
    });



    grid.on("dropped", (event, previousWidget, newWidget) => {
      // Restore the original content when dragging stops
      //  var serializedFull = grid.save(true, true);
      //  var serializedData = serializedFull;
      // console.log(serializedFull);
      // console.log(serializedData);
      // grid.enableMove(false);
      // grid.enableResize(false);
      for (var i = 0; i < this.getState.length; i++) {
        if (this.getState[i].id == newWidget.id) {
          var widgetHtml = this.getState[i].widgetHtml;
          var widgetHeight = this.getState[i].height;
          var dataBindingJsonNode = this.getState[i].dataBindingJsonNode;
          var dataSourceJson = this.getState[i].dataSourceJson;
          break;
        };
      }

      /*****************/
      var isPropertyPresent: boolean = false;

      if (this.FullJsonDataObject == "") {
        this.FullJsonDataObject += "{"
      }
      else {
        var fulljsonObject: any = JSON.parse(this.FullJsonDataObject + "}");
        isPropertyPresent = fulljsonObject.hasOwnProperty(dataBindingJsonNode);
        //alert(isPropertyPresent);
        if (!isPropertyPresent) {
          this.FullJsonDataObject += ","
        }
      }
      if (!isPropertyPresent) {
        this.FullJsonDataObject += '"' + dataBindingJsonNode + '":';
        this.FullJsonDataObject += dataSourceJson;
      }
      /******************/
      //  console.log("asdas----" + this.FullJsonDataObject);
      // console.log("full json" + this.getState)
      //   console.log( this.getState)
      var jsonObject1: any = JSON.parse(dataSourceJson);

      //   var tagname: string = dataBindingJsonNode;
      var tagname: string = "abc";
      var widgetHtmlAppend = "{{for " + tagname + "}}" + widgetHtml;
      widgetHtmlAppend += "{{/for}}";
      const renderedHtml = jsrender.templates(widgetHtmlAppend).render({ [tagname]: jsonObject1 });

      // console.log( this.getState[0]);
      const removeEl = grid.engine.nodes.find((n) => n.id == newWidget.id)?.el;
      //  console.log(removeEl);
      // alert("heloo");
      if (removeEl) grid.removeWidget(removeEl);
    //  const widgetdata ={ x: newWidget.x, y: newWidget.y,w: newWidget.w, h: newWidget.h, content: renderedHtml, id: newWidget.id + "0" };
      const widgetdata = { x: newWidget.x, y: newWidget.y, h: parseInt((widgetHeight).toString()) , content: renderedHtml, id: newWidget.id + "0" };
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

  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }

  onInputChange() {
    var widgetdata: string = "";
    if (this.searchTerm) {
      this.filteredWidgets = this.allWidgets.filter(widget => {
        return widget.widgetName.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    } else {
      // If searchTerm is empty or undefined, show all widgets
      this.filteredWidgets = this.allWidgets;
    }

    for (var i = 0; i < this.filteredWidgets.length; i++) {
      widgetdata = widgetdata + '<div class="card text-white grid-stack-item newWidget" style=" margin-bottom:3px;"  gs-id="' + this.filteredWidgets[i].id + '"> \
      <div class="card-body grid-stack-item-content add" style="padding:5px;border:1px solid grey"> \
        <div style="overflow: hidden; width:100px; white-space: nowrap; text-overflow: ellipsis;" title="' + this.filteredWidgets[i].widgetName + '"><i class="' + this.filteredWidgets[i].fontName + '"> </i> ' + this.filteredWidgets[i].widgetName + '</div> </div> </div>  ';
    }
    console.log(widgetdata);
    this.renderedWidgets = widgetdata;
    $("#widdiv").html(this.renderedWidgets);
    // Initialize advanced GridStack layout
    const grid = GridStack.init(this.gridStackOptions
      , '#advanced-grid');

    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      scroll: false,
      appendTo: 'body',
      helper: 'clone',
    });
    grid.enableMove(true);
    grid.enableResize(true);
  }

  clearSearch() {
    this.searchTerm = '';
    var widgetdata: string = "";
    for (var i = 0; i < this.allWidgets.length; i++) {
      widgetdata = widgetdata + '<div class="card text-white grid-stack-item newWidget" style=" margin-bottom:3px;"  gs-id="' + this.allWidgets[i].id + '"> \
      <div class="card-body grid-stack-item-content add" style="padding:5px;border:1px solid grey"> \
        <div style="overflow: hidden; width:100px; white-space: nowrap; text-overflow: ellipsis;" title="' + this.allWidgets[i].widgetName + '"><i class="' + this.allWidgets[i].fontName + '"> </i> ' + this.allWidgets[i].widgetName + '</div> </div> </div>  ';
    }
    console.log(widgetdata);
    this.renderedWidgets = widgetdata;
    $("#widdiv").html(this.renderedWidgets);
    // Initialize advanced GridStack layout
    const grid = GridStack.init(this.gridStackOptions
      , '#edit-advanced-grid');

    // Setup drag-and-drop for new widgets
    GridStack.setupDragIn('.newWidget', {
      scroll: false,
      appendTo: 'body',
      helper: 'clone',
    });

    grid.enableMove(true);
    grid.enableResize(true);
  }

  loadCSS() {   

  }

  previewPage() {
    const items = $(".grid-stack .grid-stack-item");
    // console.log(items);
    let itemsArray = [];
    let widgetsItemsArr: any = [];
    itemsArray = Array.from(items);
    // Process each widget item
    itemsArray.forEach(node => {
      let obj = {
      };
      obj = {
        x: node.getAttribute("gs-x"),
        y: node.getAttribute("gs-y"),
        w: node.getAttribute("gs-w"),
        h: node.getAttribute("gs-h"),
        content: node.innerHTML,
        id: node.getAttribute("gs-id"),
      };
      widgetsItemsArr.push(obj);
    });
    // console.log(widgetsItemsArr);
    let widgetsItemsStr = "";
    widgetsItemsStr = JSON.stringify(widgetsItemsArr)
    const minHeight = $('#edit-advanced-grid').css('min-height');
    console.log('Min Height:', minHeight);
    localStorage.setItem('pagehtml', widgetsItemsStr);
    localStorage.setItem('pagewidth', this.getState.pageWidth);
    localStorage.setItem('pageheight', minHeight);
    const url = this.router.createUrlTree(['/pagepreview', '']);
    window.open(url.toString(), '_blank');
  }

  saveAndUpdatePageWidgetContent() {
    const items = $(".grid-stack .grid-stack-item");
    let itemsArray = [];
    
      /*********************************/
      let widgetsItemsArr: PageWidgetsDetails[] = [];
      itemsArray = Array.from(items);
      // Process each widget item
      itemsArray.forEach(node => {
        this.pageHtml += node.outerHTML;
        let id: any = node.getAttribute("gs-id");
        id = id.substring(0, id.length - 1);
      
        let nWidget: PageWidgetsDetails = {
          id: 0,
          pageId: 0,
          widgetId: 0,
          width: 0,
          height: 0,
          startCol: 0,
          startRow: 0
        };
        nWidget.widgetId = id;
        nWidget.id = 0;
        nWidget.pageId = this.editPageId;
        nWidget.startCol = Number(node.getAttribute("gs-y"));
        nWidget.startRow = Number(node.getAttribute("gs-x"));
        nWidget.width = parseInt((node.offsetWidth / 2.625).toString());
        nWidget.height = parseInt(Number(node.getAttribute("gs-h")).toString());
        widgetsItemsArr.push(nWidget);
        /****************************/

      });
    let fileRefCssName = (localStorage.getItem('fileRefCssName') != "" ? localStorage.getItem('fileRefCssName') : this.getState.pageCSSUrl);
    const minHeight = $('#edit-advanced-grid').css('min-height');
    console.log('Min Height:', minHeight);
    console.log("pagecssurl", this.getState.pageCSSUrl);
    console.log("fileRefCssName", fileRefCssName);
    // Create data object to save
    let savedpage: PageModel = {
      pageName: this.getState.pageName,
      description: this.getState.description ?? "",
      dataSourceJson: this.FullJsonDataObject ?? "",//we have doubt here
      pageHtml: this.pageHtml ?? "",
      pageContent:"",
      pageCSSUrl: fileRefCssName ?? "",
      Widgets: widgetsItemsArr,
      pageWidth: this.getState.pageWidth,
      pageHeight: Number(minHeight.replace('px', ''))
    }   
    // Call the addPage method from pagesService to save the data
    this.pagesService.updatePage(this.editPageId, savedpage).subscribe({
      next: (response) => {
        alert("Data updated successfully");
        this.router.navigate(['pages']);
      },
      error: (error) => {
        alert("Data updation Failed");
        console.log(error);
      },
    });
  }

  canclePage() {
    this.router.navigate(['pages']);
  }
}
