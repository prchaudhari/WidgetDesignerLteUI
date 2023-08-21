import { Component } from '@angular/core';

import { Pages } from '../../models/pages.model';
import { PagesService } from '../../services/pages.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-wizard1',
  templateUrl: './page-wizard1.component.html',
  styleUrls: ['./page-wizard1.component.css']
})
export class PageWizard1Component {
  widget: Pages[] = [];
  newPage: Pages = {
    id: 0,
    pageName: '',
    description: '',
    dataSourceJson: '',
    pageHtml: '',
    pageCSSUrl: ''
  };
  constructor(
    private http: HttpClient,
    private PagesService: PagesService,
    private router: Router
  ) { }

  addPage() {
   
    const formData: any = new FormData();
    formData.append('id', '');
    formData.append('pageName', this.newPage.pageName);
    formData.append('description', this.newPage.description);
    formData.append('dataSourceJson', this.newPage.dataSourceJson);
    formData.append('pageHtml', this.newPage.pageHtml);
    formData.append('pageCSSUrl', this.newPage.pageCSSUrl);

    this.PagesService.addPage(formData).subscribe({
      next: (_widget) => {
        alert("data saved successfully");
        this.router.navigate(['pages/addpage']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
