import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './widgetpreview.component.html',
  styleUrls: ['./widgetpreview.component.css']
})
export class widgetpreviewComponent implements OnInit
{
  @Output() onCloseClick = new EventEmitter<number>();
  renderedTemplate = '';
  receivedData: any;
  cssname: string = "assets/dynamicThemes/cssTheme1.css";
  constructor(private Activatedroute: ActivatedRoute,
        injector: Injector,
      private router: Router,
        public bsModalRef: BsModalRef,
  ) {
    
  }
  loadCSS() {
    let fileRef;
    fileRef = document.createElement('link');
    fileRef.setAttribute('rel', 'stylesheet');
    fileRef.setAttribute('type', 'text/css');
   // alert("drop down: " + this.cssname);
    fileRef.setAttribute('href', '../../' + this.cssname);
    if (typeof fileRef !== 'undefined') {
      document.getElementsByTagName('head')[0].appendChild(fileRef);
    }
  }
  changeCSS() {
    this.loadhtml();
  }

  ngOnInit() {
    this.loadhtml();
    
  }

  loadhtml() {
    this.loadCSS();
   const token = localStorage.getItem('widgethtml');
    alert(token);
    this.renderedTemplate = token == null ? '' : token;
    //this.Activatedroute.queryParams.subscribe(params => {
    //  const data = params['css']; // Access the data
      // Do something with the data
     // alert(data);
      //this.renderedTemplate = data;
   // });
  }
 
    }

