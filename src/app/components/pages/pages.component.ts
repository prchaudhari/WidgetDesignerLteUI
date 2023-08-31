import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../../models/pages.model';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  page: Pages[] = [];
  public rowSelected: number;

  constructor(
    private pageService: PagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageService.getAllPages().subscribe({
      next: (page) => {
        this.page = page;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }



  previewPage(pageHtml: any) {

    console.log(pageHtml);
    //let widgetsItemsStr = "";
    //widgetsItemsStr = JSON.stringify(pageHtml);
    //console.log(widgetsItemsStr);



    const items = $(pageHtml);
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
      // let objstr = "";
      //objstr = JSON.parse(widgetsItemsStr);
      //console.log(objstr);
      //console.log(widgetsItemsStr);
      localStorage.setItem('pagehtml', widgetsItemsStr);
      const url = this.router.createUrlTree(['/pagepreview', '']);
      window.open(url.toString(), '_blank');
    }


  editPage(pageHtml: any, pageId: any) {

    console.log(pageHtml);
    //let widgetsItemsStr = "";
    //widgetsItemsStr = JSON.stringify(pageHtml);
    //console.log(widgetsItemsStr);
    const items = $(pageHtml);
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
    // let objstr = "";
    //objstr = JSON.parse(widgetsItemsStr);
    //console.log(objstr);
    //console.log(widgetsItemsStr);
    localStorage.setItem('editpagehtml', widgetsItemsStr);
    localStorage.setItem('editPageId', pageId);
  
    this.router.navigate(['page/edit/', pageId]);
  }


  public openCloseRow(idReserva: number): void {

    if (this.rowSelected === -1) {
      this.rowSelected = idReserva
    }
    else {
      if (this.rowSelected == idReserva) {
        this.rowSelected = -1
      }
      else {
        this.rowSelected = idReserva
      }

    }
  }

  deletePage(id: number) {
    if (confirm("Are you sure to delete ")) {

      this.pageService.deletePage(Number(id)).subscribe({
        next: (response) => {
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        }
      });
    }
  }
}
