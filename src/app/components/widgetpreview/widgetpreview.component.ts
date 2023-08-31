import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../services/widget.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config';

@Component({
  templateUrl: './widgetpreview.component.html',
  styleUrls: ['./widgetpreview.component.css']
})
export class widgetpreviewComponent implements OnInit {
  @Output() onCloseClick = new EventEmitter<number>();
  renderedTemplate = '';
  receivedData: any;
  cssFiles: string[] = [];
  cssname: string = "assets/dynamicThemes/cssTheme1.css";
  constructor(private Activatedroute: ActivatedRoute,
    injector: Injector,
    private router: Router,
    public bsModalRef: BsModalRef
  ) {

  }
  loadCSS() {
    let fileRef;
    fileRef = document.createElement('link');
    fileRef.setAttribute('rel', 'stylesheet');
    fileRef.setAttribute('type', 'text/css');
    this.cssname = "assets/dynamicThemes/" + this.cssname + ".css";
    fileRef.setAttribute('href', '../../' + this.cssname);
    this.cssname
    if (typeof fileRef !== 'undefined') {
      document.getElementsByTagName('head')[0].appendChild(fileRef);
    }
  }
  changeCSS() {
    this.loadhtml();
  }

  //getCssFiles() {
  //  // Make an HTTP GET request to fetch the list of CSS files
  //  this.http.get<string[]>('/assets/dynamicThemes').subscribe(
  //    (cssFiles) => {
  //      console.log('List of CSS files:', cssFiles);

  //      // Now you have an array of CSS file names in `cssFiles`
  //    },
  //    (error) => {
  //      console.error('Error fetching CSS files:', error);
  //    }
  //  );
  //}

  ngOnInit() {
    this.cssFiles = AppConfig.cssFiles;
    //this.widgetService.getCssFiles().subscribe((fileNames: string[]) => {
    //  this.cssFiles = fileNames;
    //});
    //this.widgetService.getCssFiles().subscribe(response => {
    //  // Parse the response text to extract the file names
    //  const lines = response.split('\n');
    //  this.cssFiles = lines.filter(line => line.trim().endsWith('.css'));
    //  alert(this.cssFiles.length);
    //});
    this.loadhtml();

  }

  loadhtml() {
    this.loadCSS();
    const token = localStorage.getItem('widgethtml');
    this.renderedTemplate = token == null ? '' : token;

  }

}

