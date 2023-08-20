import { Component } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery
import 'bootstrap'; // Import Bootstrap JavaScript
import 'gridstack'; // Import Gridstack JavaScript
import { GridStack } from 'gridstack'; // Import Gridstack module type
import { Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
 
  widget: Widget[] = [];
  constructor(
    private widgetService: WidgetService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    // Your initialization logic
    this.widgetService.getAllWidget().subscribe({
      next: (widget) => {
        this.widget = widget;
        console.log(this.widget[0].widgetName);
      },
      error: (response) => {
        console.log(response);
      },
    });
    const advanced = [
      { x: 0, y: 0, w: 4, h: 2, content: '1' },
      { x: 4, y: 0, w: 4, h: 2, content: '2' },
      { x: 8, y: 0, w: 2, h: 2, content: '3' },
      { x: 10, y: 0, w: 2, h: 2, content: '4' },
      { x: 0, y: 2, w: 2, h: 2, content: '5' },
      { x: 2, y: 2, w: 2, h: 4, content: '6' },
      { x: 8, y: 2, w: 4, h: 2, content: '7' },
      { x: 0, y: 4, w: 2, h: 2, content: '8' },
      { x: 4, y: 4, w: 4, h: 2, content: '9' },
      { x: 8, y: 4, w: 2, h: 2, content: '10' },
      { x: 10, y: 4, w: 2, h: 2, content: '11' }
    ];

    const advGrid = GridStack.init({
     margin: 5,
      acceptWidgets: true,// acceptWidgets - accept widgets dragged from other grids or from outside (default: false).
     
      removable: '#trash', // drag-out delete class
      animate: true, // You can customize options based on your requirements
      draggable: {
        handle: '.grid-stack-item-content' // Use your specific handle class here
      }
    }, '#advanced-grid')
      .load(advanced);

  

    GridStack.setupDragIn('.newWidget', {  scroll: false, appendTo: 'body', helper: 'clone' });







  }
  saveAndUpdateWidgetContent() {
    const items = $(".grid-stack .grid-stack-item");

      console.log(items);
   

  }

 

}
