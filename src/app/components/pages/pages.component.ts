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

  previewPage() {
   
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
