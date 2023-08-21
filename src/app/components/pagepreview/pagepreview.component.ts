import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './pagepreview.component.html',
  styleUrls: ['./pagepreview.component.css']
})
export class pagepreviewComponent implements OnInit {
  @Output() onCloseClick = new EventEmitter<number>();
  renderedTemplate = '';
  receivedData: any;
  cssname: string = "assets/dynamicThemes/cssTheme1.css";
  constructor(public bsModalRef: BsModalRef,
  ) {

  }
  loadCSS() {
    let fileRef;
    fileRef = document.createElement('link');
    fileRef.setAttribute('rel', 'stylesheet');
    fileRef.setAttribute('type', 'text/css');
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
    const token = localStorage.getItem('pagehtml');
    alert(token);
    this.renderedTemplate = token == null ? '' : token;

  }

}

