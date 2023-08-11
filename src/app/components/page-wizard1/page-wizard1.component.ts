import { Component } from '@angular/core';
import { Widget } from '../../models/widget.model';

@Component({
  selector: 'app-page-wizard1',
  templateUrl: './page-wizard1.component.html',
  styleUrls: ['./page-wizard1.component.css']
})
export class PageWizard1Component {
  widget: Widget[] = [];
}
