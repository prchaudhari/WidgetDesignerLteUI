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
  generate(Id: number) {
    localStorage.setItem('generateId', Id.toString());
    console.log(localStorage.getItem('generateId'));
    const url = this.router.createUrlTree(['/pages/generate', '']);
    window.open(url.toString(), '_blank');
  }

}



