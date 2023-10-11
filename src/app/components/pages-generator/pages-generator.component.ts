import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../../models/pages.model';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-pages-generator',
  templateUrl: './pages-generator.component.html',
  styleUrls: ['./pages-generator.component.css']
})
export class PagesGeneratorComponent {

  pages: Pages[] = [];
  public rowSelected: number;

  constructor(
    private pagesService: PagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pagesService.getAllPages().subscribe({
      next: (pages) => {
        this.pages = pages;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  previewPage() {

  }

  //previewPage(pageHtml: any) {

  //  console.log(pageHtml);
  //  //let widgetsItemsStr = "";
  //  //widgetsItemsStr = JSON.stringify(pageHtml);
  //  //console.log(widgetsItemsStr);



  //  const items = $(pageHtml);
  //  // console.log(items);
  //  let itemsArray = [];
  //  let widgetsItemsArr: any = [];
  //  itemsArray = Array.from(items);
  //  // Process each widget item
  //  itemsArray.forEach(node => {
  //    let obj = {
  //    };
  //    obj = {
  //      x: node.getAttribute("gs-x"),
  //      y: node.getAttribute("gs-y"),
  //      w: node.getAttribute("gs-w"),
  //      h: node.getAttribute("gs-h"),
  //      content: node.innerHTML,
  //      id: node.getAttribute("gs-id"),
  //    };
  //    widgetsItemsArr.push(obj);
  //  });
  //  // console.log(widgetsItemsArr);
  //  let widgetsItemsStr = "";
  //  widgetsItemsStr = JSON.stringify(widgetsItemsArr)
  //  // let objstr = "";
  //  //objstr = JSON.parse(widgetsItemsStr);
  //  //console.log(objstr);
  //  //console.log(widgetsItemsStr);
  //  localStorage.setItem('pagehtml', widgetsItemsStr);
  //  const url = this.router.createUrlTree(['/pagepreview', '']);
  //  window.open(url.toString(), '_blank');
  //}



}



