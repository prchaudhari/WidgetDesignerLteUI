import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from '../../models/pages.model';
import { PageModel } from '../../models/pagesmodel.model';
import { PageWidgetsDetails } from '../../models/pagewidgetsdetails.model'
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-edit-page-wizard1',
  templateUrl: './edit-page-wizard1.component.html',
  styleUrls: ['./edit-page-wizard1.component.css']
})
export class EditPageWizard1Component implements OnInit {
  updatePageRequest: Pages = {
    id: 0,
    pageName: '',
    description: '',
    dataSourceJson: '',
    pageHtml: '',
    pageCSSUrl: ''
  };
 
  constructor(
    private pageService: PagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.pageService.getPage(Number(id)).subscribe({
            next: (page) => {
              this.updatePageRequest = page;
            },
          });
        }
      },
    });
  }

 
}
