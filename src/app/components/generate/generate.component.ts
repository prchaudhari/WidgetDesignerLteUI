import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent {
  pageId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageId = Number(localStorage.getItem('generateId'));
  }

}

