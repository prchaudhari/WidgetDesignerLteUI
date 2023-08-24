import { Component, ElementRef, ViewChild, ViewEncapsulation,OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as jsrender from 'jsrender';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-JsRenderTry',
  templateUrl: './JsRenderTry.component.html',
  styleUrls: ['./JsRenderTry.component.css']
})
export class JsRenderTryComponent {
  @ViewChild('renderTarget') renderTarget?: ElementRef;
  renderedTemplate = ''; // Store the rendered template here
  tableContainer:string= ''; // Store the rendered template here
  ckeditorContent: any;
  htmltextvalue: string = "";
  dataSourceJson: string = "";
  WidgetHtml: string = "";
  cells: number[] = Array(9).fill(0); // Adjust the number of cells as needed

  cellClicked(index: number): void {
    const row = Math.floor(index / 3) + 1; // Calculate the row number
    const column = (index % 3) + 1; // Calculate the column number
    alert(`Row: ${row}, Column: ${column}`);
  }
//  Showtry() {
//    Swal.fire({
//      title: 'Error!',
//      text: 'Do you want to continue',
//      icon: 'error',
//      confirmButtonText: 'Cool'
//    })
    
//    // JSON data
//    const jsonData = [
//      {
//        "name": "Amit",
//        "balance": "10000",
//        "Address": {
//          "Line1": "Address Line1",
//          "Line2": {
//            "city": "Mumbai",
//            "state": "Maharashtra"
//          }
//        },
//        "src": "assets/img.jpg"
//      },
//      {
//        "name": "Jay",
//        "balance": "20000",
//        "Address": {
//          "Line1": "Jay Address Line11",
//          "Line2": "Jay Address Line2"
//        }
//      }
//    ];

//    // JsRender Template
//    const template = `
//      <table>
//        <thead>
//          <tr>
//            <th>Name</th>
//            <th>Balance</th>
//            <th>Address</th>
//            <th>City</th>
//            <th>State</th>
//            <th>Image</th>
//          </tr>
//        </thead>
//        <tbody>
//          {{for employees}}
//            <tr>
//              <td>{{:name}}</td>
//              <td>{{:balance}}</td>
//              <td>{{:Address.Line1}}</td>
//              <td>{{if Address.Line2.city}} {{:Address.Line2.city}} {{/if}}</td>
//              <td>{{if Address.Line2.state}} {{:Address.Line2.state}} {{/if}}</td>
//              <td>{{:src}}</td>
//            </tr>
//          {{/for}}
//        </tbody>
//      </table>
//    `;

//    // Compile and render the template with JSON data
//    const renderedHtml = jsrender.templates(template).render({ employees: jsonData });
   
//    // Insert the rendered HTML into the table container
//    this.tableContainer = renderedHtml;
//  }
//  ShowPreview() {
  
//     var jsonObject1: any = JSON.parse(this.dataSourceJson);
//   // this.appendCss(this.widgetCSS);
//    const data = {
//      title: 'Hello',
//      description: 'This is a description',
//    };
   
//    const renderedHtml = jsrender.templates(this.WidgetHtml).render({ employees: jsonObject1 });
   
//    // Insert the rendered HTML into the table container
//    this.renderedTemplate = renderedHtml;

//  }
}
