import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GridStack, GridStackOptions } from "gridstack";
import { GridStackElement, GridStackWidget, } from "gridstack/dist/types";
import { AppConfig } from '../../../config';

@Component({
  templateUrl: './pagepreview.component.html',
  styleUrls: ['./pagepreview.component.css']
})

export class pagepreviewComponent implements OnInit {
  // Configuration options for the GridStack layout
  private gridStackOptions: GridStackOptions = {
    disableResize: true,
    disableDrag: true,
    margin: 0,
    column: 400,
    //cellHeight:50 ,
    float: true,
  };

  @Output() onCloseClick = new EventEmitter<number>();
  cssFiles: string[] = [];
  cssname: string|null = "";
  cssNameWithPath: string = "";


  constructor() {

  }


  //constructor() {
  //}
  //renderedTemplate = '';
  //receivedData: any;
  //cssname: string = "assets/dynamicThemes/cssTheme1.css";
  //ngAfterViewInit(): void {
  //}

  ngOnInit(): void {
    this.cssFiles = AppConfig.cssFiles;
    if (localStorage.getItem('fileRefCssName')) { this.cssname = localStorage.getItem('fileRefCssName') };
    // Initialize advanced GridStack layout
    const grid = GridStack.init(this.gridStackOptions
      , '#advanced-grid-preview')
    let pageHtml = localStorage.getItem('pagehtml');
    //console.log(pageHtml);
    if (pageHtml !== null) {
      let obj = [];
      obj = JSON.parse(pageHtml);
      obj.forEach((widgetData: GridStackWidget | GridStackElement | undefined) => {
        grid.addWidget(widgetData);
      });
      //  console.log(obj);
      //  const itemsArray = Array.from(pageHtml);
      //  console.log(itemsArray);
      // Now you can work with the itemsArray
    } else {
      // Handle the case where 'pagehtml' in localStorage is null
      alert("No data found.")
    }
    this.loadhtml();
  }
  //canclePage() {
  //  this.router.navigate(['pages']);
  //}
  loadCSS() {

    
    let fileRef;
    fileRef = document.createElement('link');
    fileRef.setAttribute('rel', 'stylesheet');
    fileRef.setAttribute('type', 'text/css');
    this.cssNameWithPath = "assets/dynamicThemes/" + this.cssname + ".css";
    fileRef.setAttribute('href', '../../' + this.cssNameWithPath);
    if (typeof fileRef !== 'undefined') {
      document.getElementsByTagName('head')[0].appendChild(fileRef);
    }
    // Assuming this.cssname is a variable that can be either a string or null
    let cssName = this.cssname || ""; // Use an empty string as the default if this.cssname is null
    localStorage.setItem('fileRefCssName', cssName);
    

  }
  changeCSS() {
    this.loadhtml();
  }

   loadhtml() {
   this.loadCSS();
}
}

  



    






