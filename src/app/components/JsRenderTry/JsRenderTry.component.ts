import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as jsrender from 'jsrender';
import Swal from 'sweetalert2';
import * as html2pdf from 'html2pdf.js';
import { jsPDF } from "jspdf";

import html2canvas from 'html2canvas'; // Import html2canvas
import { WidgetService } from '../../services/widget.service';
import { PagesService } from '../../services/pages.service';
import { Widget } from '../../models/widget.model';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { Pages } from '../../models/pages.model';

@Component({
  selector: 'app-JsRenderTry',
  templateUrl: './JsRenderTry.component.html',
  styleUrls: ['./JsRenderTry.component.css']
})
export class JsRenderTryComponent {
  @ViewChild('renderTarget') renderTarget?: ElementRef;
  renderedTemplate = ''; // Store the rendered template here
  tableContainer: string = ''; // Store the rendered template here
  ckeditorContent: any;
  htmltextvalue: string = "";
  dataSourceJson: string = "";
  WidgetHtml: string = "";
  pagewidget: Widget;
  pageInfo: Pages;
  cells: number[] = Array(9).fill(0); // Adjust the number of cells as needed
  constructor(
    private pagesService: PagesService,
    private widgetService: WidgetService) {

  }

  cellClicked(index: number): void {
    const row = Math.floor(index / 3) + 1; // Calculate the row number
    const column = (index % 3) + 1; // Calculate the column number
    alert(`Row: ${row}, Column: ${column}`);
  }


  async createPDFs() {
    let pageID: number = 33;
    let FullHTML: string = "";
    let chilrenAfterReplace: any;
    let jasondata = `[
        { "AdharcardUniqueNo":  { "adharnumber": "0000 1111 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
        { "AdharcardUniqueNo":  { "adharnumber": "0000 2222 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
        { "AdharcardUniqueNo":  { "adharnumber": "0000 3333 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
        { "AdharcardUniqueNo":  { "adharnumber": "0000 4444 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
        { "AdharcardUniqueNo":  { "adharnumber": "0000 5555 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }}
        ]`;
    const parseJsonData = JSON.parse(jasondata);
    for (let j = 0; j < parseJsonData.length; j++) {
      FullHTML = "";
      //start for loop
      this.pagesService.getPage(pageID).subscribe({
        next:async (page) => {
         // console.log(page.pageCSSUrl);
         
          chilrenAfterReplace = await this.ReplaceContent(page.pageContent, parseJsonData[j]);
          console.log(chilrenAfterReplace);
          FullHTML = page.pageHtml;
          FullHTML += chilrenAfterReplace;
          FullHTML += `};
                grid = GridStack.addGrid(document.querySelector('#advanced-grid'), serializedFull)
                </script>`;
         console.log(FullHTML);
        },
      });

      //end for loop
    }
  }

  async ReplaceContent(children: string, jsonsata: any) {
    //let pageID: number=33;
    //let children = `[{"x":126,"y":7,"w":185,"h":35,"content":"<div><img src=\\"assets/sampleHeader.jpg\\"></div>","id":"1017"},{"x":104,"y":46,"w":68,"h":114,"content":"<div><img class=\\"imgcss\\" src=\\"assets/logosatya.jpg\\"></div>","id":"1016"},{"x":301,"y":102,"w":73,"h":14,"content":"<div class=\\"adharnumbercss\\">0000 1111 2222</div>","id":"1020"},{"x":225,"y":122,"w":76,"h":128,"content":"<div><img class=\\"imgcss\\" src=\\"assets/logosatya.jpg\\"></div>","id":"1016"},{"x":42,"y":160,"w":73,"h":120,"content":"<div><img class=\\"imgcss\\" src=\\"assets/logosatya.jpg\\"></div>","id":"1016"},{"x":134,"y":160,"w":59,"h":59,"content":"<div><img src=\\"assets/sampleAdharQr.jpg\\"></div>","id":"1021"},{"x":43,"y":280,"w":185,"h":40,"content":"<div><img src=\\"assets/sampleHeader.jpg\\"></div>","id":"1017"}]`;
   // console.log(jsonsata);
    const chilrenAfterReplace = JSON.parse(children);
    const contentArray = [];
    //let jasondata = `[
    //    { "AdharcardUniqueNo":  { "adharnumber": "0000 1111 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
    //    { "AdharcardUniqueNo":  { "adharnumber": "0000 2222 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
    //    { "AdharcardUniqueNo":  { "adharnumber": "0000 3333 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
    //    { "AdharcardUniqueNo":  { "adharnumber": "0000 4444 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }},
    //    { "AdharcardUniqueNo":  { "adharnumber": "0000 5555 2222" } , "AdharcardQR": { "src": "assets/sampleAdharQr.jpg" }  , "AdharCardHeader": { "src": "assets/sampleHeader.jpg" },"SatyaMevLogo": { "src": "assets/logosatya.jpg" }}
    //    ]`;
    //const parseJsonData = JSON.parse(jasondata);
    //const adharcardUniqueNo = parseJsonData[0].AdharcardUniqueNo.adharnumber;

    // console.log(adharcardUniqueNo);
    // for (let j = 0; j < parseJsonData.length; j++) {
    //replace content with jsrender html
    for (let i = 0; i < chilrenAfterReplace.length; i++) {
      const child = chilrenAfterReplace[i];
      const content = child.content;
      const id = child.id;

      // Create a promise for the asynchronous operation
      const widgetPromise = new Promise<void>(async (resolve) => {
        await this.widgetService.getWidget(Number(id)).subscribe({
          next: (widget) => {
            this.pagewidget = widget;
            let DataContent = "{{for " + widget.dataBindingJsonNode + "}}" + widget.widgetHtml + "{{/for}}";
            let jsonForWidget = jsonsata[widget.dataBindingJsonNode];
            const renderedHtml = jsrender.templates(DataContent).render({ [widget.dataBindingJsonNode]: jsonForWidget });
            chilrenAfterReplace[i].content = renderedHtml;
            // afterch = con[i].content;
            //console.log(`Content: ${content}`);
            // console.log(`Content: ${afterch}`);
            resolve(); // Resolve the promise when the operation is done
          },
        });
      });
      contentArray.push(widgetPromise);
    }
    //After replace content
    //  }
    await Promise.all(contentArray);

    // Convert the updated `chilrenAfterReplace` object back to a JSON string
    const updatedChildrenJSON = JSON.stringify(chilrenAfterReplace);
    return updatedChildrenJSON;
    //return chilrenAfterReplace;
  }

  GenerateHTML(pageId: number, chilrenAfterReplace: string) {
    let FullHTML: string = "";
    this.pagesService.getPage(pageId).subscribe({
      next: (page) => {
        console.log(page.pageCSSUrl);
        FullHTML += page.pageHtml;
        FullHTML += chilrenAfterReplace;
      },
    });
  }

  generatePDF() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });
    // Get the HTML element you want to convert to a PDF
    const htmlContentToConvert = '<div><h1>Hello, World!</h1><p>This is a sample HTML content.</p></div>';
    const content = document.createElement('div');
    content.innerHTML = htmlContentToConvert;

    // Convert the HTML element to a canvas using html2canvas
    html2canvas(content).then((canvas) => {
      // Get the canvas as a data URL
      const imgData = canvas.toDataURL('image/png');

      // Add the image to the PDF
      doc.addImage(imgData, 'JPEG', 0.5, 0.5, 3, 1);

      // Save the PDF
      doc.save('two-by-four.pdf');
    });
    //const doc = new jsPDF();

    //doc.text("Hello world!", 10, 10);
    //doc.save("a4.pdf");

    //const htmlContentToConvert = '<div><h1>Hello, World!</h1><p>This is a sample HTML content.</p></div>';
    //const content = document.createElement('div');
    //content.innerHTML = htmlContentToConvert;
    //const pdfOptions = {
    //  orientation: 'p',
    //  unit: 'mm',
    //  format: 'a4',
    //};


    //html2canvas(content).then(canvas => {
    //  const imgData = canvas.toDataURL('image/png');
    //  const pdf = new jsPDF(pdfOptions);// Portrait, millimeters, A4 size
    //  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // x, y, width, height (A4 size)
    //  pdf.save('document.pdf');
    //});
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
