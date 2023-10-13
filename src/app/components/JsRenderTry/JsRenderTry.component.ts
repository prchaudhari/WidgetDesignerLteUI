import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as jsrender from 'jsrender';
import Swal from 'sweetalert2';
import * as fileSaver from 'file-saver';
import * as htmlToText from 'html-to-text';

//import { jsPDF } from "jspdf";

//import html2canvas from 'html2canvas'; // Import html2canvas
import { WidgetService } from '../../services/widget.service';
import { PagesService } from '../../services/pages.service';
import { Widget } from '../../models/widget.model';
//import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { Pages } from '../../models/pages.model';
import { PagesGeneratorService } from '../../services/pages-generator.service';

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
    private widgetService: WidgetService,
    private pagegenService: PagesGeneratorService) {

  }

  cellClicked(index: number): void {
    const row = Math.floor(index / 3) + 1; // Calculate the row number
    const column = (index % 3) + 1; // Calculate the column number
    alert(`Row: ${row}, Column: ${column}`);
  }

  downloadFile() {
    // Your file content
    const text = 'This is the content you want to save in the file.';

    // Create a Blob containing the text
    const blob = new Blob([text], { type: 'text/plain' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'your-file.txt'; // Specify the filename

    // Trigger a click event on the link to start the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);

  }

  generateAndSaveHtmlFile() {
    // Your HTML content as a string
    const htmlContent = `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack.min.js" integrity="sha512-pkNvyLwxqzI8F2twP8wOamoh34GlKQ+tyJblGUUshzmzlhx8pH8MLVWiSHaGtjhmDzFEyYKLBYJh6LB8SjqhQg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-base-impl.min.js" integrity="sha512-mhZn+o/RSWCNMh6NpFW4pTDzGcqwhL2xH2RdRHOQ5dnj5HDrlPwMuHZdAwB8ZOXZcIhR6IgzXUh4DuG13PsPDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-draggable.min.js" integrity="sha512-sSFfSy2GIiKi4gnsGPMqDR9LtB9zpzfIrt0dZPvIwGfRT9+X96drxBHgVeKAnd2amnxUAfl53PVaCmzwC2EYLg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-droppable.min.js" integrity="sha512-sMgq5dN52XzHWsjhNiX5fFyulEdQBTE8o1bgz2NdOwWPtyyVhjl1vSqRdURE4Z46YQP9zPAuiBkKc3Eoxjx6dg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-element.min.js" integrity="sha512-zvWjOI2JNrhq7K/mfZu0zg6wHRd7iWDF5g7cc4QC6ZbGpIXlc6C1bFoDcj9KqQkU2G56x81qq+NQKRVNbDc2LQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-gridstack.min.js" integrity="sha512-oW+gSIipurBmLwpZ118oDGrct/TRfAFn1xG5Si7/W5p3d7uQfkKMhWQFaZ4J3n4azI4weY7oHUirB+my7fk5oQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-manager.min.js" integrity="sha512-7c2iOKYLmwWFiZ0bdYJ1p8EvDwJFbFBvKTfVgLBCpPlLiXlITMumR/9aymNLEGqfVNzQjg+hJKcATL3PvZhY9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-resizable-handle.min.js" integrity="sha512-39RxJSWIR/PeGV0VjWr2o04jZ2sO0r4epUc83D1dgmxeSq9DDG6oXpTNjBn7VYsjcKj5f62+48d3HrRIwoQ4Sw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-resizable.min.js" integrity="sha512-70En4rJtciVQgKTXmsbWJB3oXifFA34mmM4NxdSmhZ5D1LHfcwwv8rnilzEPt5Pl6NWX0jywMvOCwojjlAiM9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-touch.min.js" integrity="sha512-vjVJaLxpyUUIglJ57re2ma0FHFNgBylFQsScF927K2bYR/Jda2IusJlUz6b09EXCv198/jgywbA6iNLs6pkMpA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack-all.min.js" integrity="sha512-d4yEeh4uaVGevmpY/WeT1O8D87goNW909xq3Wo234+wYkKY5CbG5UPtI0BopeJjUgadwtm63eMePpACIvbX05Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack-engine.min.js" integrity="sha512-r4mQQ0nN5Sr5XzAyv7bZA12Hl5XNFkVxFtsT1FyKswEDNxM2G9SmzGW7Io77T3sQV/LGzipg2kGV4krobVDZrQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack-extra.min.css" integrity="sha512-287EQpO1sItRDNvuCUARDlhpQs3qLRCMaidpOKp5BFu6EgcX3XxB92jmTvdXWW57Q9ImHcYqIHKx12EATT3sPA==" crossorigin="anonymous" referrerpolicy="no-referrer" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack.min.css" integrity="sha512-pn/nPcd3DeaEfwRkSD6DFdXrLFoiGhUZ9LjVwzxmaY1LXRG9yooFrWbAzDBidAuN30rw9LmFI8/RMGiD4/1xsA==" crossorigin="anonymous" referrerpolicy="no-referrer" /><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/types.min.js" integrity="sha512-FqFjO4sevT7ilpbvbinXvm1xj1u5qmUclAmocAsOHbPxHob5D2fR3oTYTsSKdjlWBkyiv59qvtyQGNoz1HgYnQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/utils.min.js" integrity="sha512-RR3u9WaZXGE5ajHDwcYoOhz2no/+hpxuA/nZVxuvmOkh7E1XjdH8neykDfow0Ag7IW5GU//3i7Vs13Q2nKX+pw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><link href="cssTheme1.css" rel = "stylesheet" /><link href="app.component.css" rel="stylesheet" /><link href="add-page.component.css" rel="stylesheet" /><body><div class="col-sm-12 col-md-10" style = "padding:0px;"><div class="grid-container"><div class="grid-stack" id = "advanced-grid" style = "width: 1050px;height: 1497.59px; min-height: 1497.6px;"></div></div></div><div id = "advanced-grid"></div></body><script type="text/javascript">;var serializedFull={'margin':0,'column':400,'acceptWidgets':!0,'removable':'#trash','float':!0,'disableOneColumnMode':!0,'children':[{'x':126,'y':7,'w':185,'h':35,'content':'<div><img src=http://localhost:4200/assets/sampleHeader.jpg></img></div>','id':'1017'},{'x':104,'y':46,'w':68,'h':114,'content':'<div><img class="imgcss" src=http://localhost:4200/assets/logosatya.jpg></img></div>','id':'1016'},{'x':301,'y':102,'w':73,'h':14,'content':'<div class="adharnumbercss">0000 1111 2222</div>','id':'1020'},{'x':225,'y':122,'w':76,'h':128,'content':'<div><img class="imgcss" src=http://localhost:4200/assets/logosatya.jpg></img></div>','id':'1016'},{'x':42,'y':160,'w':73,'h':120,'content':'<div><img class="imgcss" src=http://localhost:4200/assets/logosatya.jpg></img></div>','id':'1016'},{'x':134,'y':160,'w':59,'h':59,'content':'<div><img src=http://localhost:4200/assets/sampleAdharQr.jpg></img></div>','id':'1021'},{'x':43,'y':280,'w':185,'h':40,'content':'<div><img src=http://localhost:4200/assets/sampleHeader.jpg></img></div>','id':'1017'}]};grid=GridStack.addGrid(document.querySelector('#advanced-grid'),serializedFull)</script><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack.min.js" integrity="sha512-pkNvyLwxqzI8F2twP8wOamoh34GlKQ+tyJblGUUshzmzlhx8pH8MLVWiSHaGtjhmDzFEyYKLBYJh6LB8SjqhQg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-base-impl.min.js" integrity="sha512-mhZn+o/RSWCNMh6NpFW4pTDzGcqwhL2xH2RdRHOQ5dnj5HDrlPwMuHZdAwB8ZOXZcIhR6IgzXUh4DuG13PsPDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-draggable.min.js" integrity="sha512-sSFfSy2GIiKi4gnsGPMqDR9LtB9zpzfIrt0dZPvIwGfRT9+X96drxBHgVeKAnd2amnxUAfl53PVaCmzwC2EYLg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-droppable.min.js" integrity="sha512-sMgq5dN52XzHWsjhNiX5fFyulEdQBTE8o1bgz2NdOwWPtyyVhjl1vSqRdURE4Z46YQP9zPAuiBkKc3Eoxjx6dg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-element.min.js" integrity="sha512-zvWjOI2JNrhq7K/mfZu0zg6wHRd7iWDF5g7cc4QC6ZbGpIXlc6C1bFoDcj9KqQkU2G56x81qq+NQKRVNbDc2LQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-gridstack.min.js" integrity="sha512-oW+gSIipurBmLwpZ118oDGrct/TRfAFn1xG5Si7/W5p3d7uQfkKMhWQFaZ4J3n4azI4weY7oHUirB+my7fk5oQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-manager.min.js" integrity="sha512-7c2iOKYLmwWFiZ0bdYJ1p8EvDwJFbFBvKTfVgLBCpPlLiXlITMumR/9aymNLEGqfVNzQjg+hJKcATL3PvZhY9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-resizable-handle.min.js" integrity="sha512-39RxJSWIR/PeGV0VjWr2o04jZ2sO0r4epUc83D1dgmxeSq9DDG6oXpTNjBn7VYsjcKj5f62+48d3HrRIwoQ4Sw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-resizable.min.js" integrity="sha512-70En4rJtciVQgKTXmsbWJB3oXifFA34mmM4NxdSmhZ5D1LHfcwwv8rnilzEPt5Pl6NWX0jywMvOCwojjlAiM9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/dd-touch.min.js" integrity="sha512-vjVJaLxpyUUIglJ57re2ma0FHFNgBylFQsScF927K2bYR/Jda2IusJlUz6b09EXCv198/jgywbA6iNLs6pkMpA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack-all.min.js" integrity="sha512-d4yEeh4uaVGevmpY/WeT1O8D87goNW909xq3Wo234+wYkKY5CbG5UPtI0BopeJjUgadwtm63eMePpACIvbX05Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack-engine.min.js" integrity="sha512-r4mQQ0nN5Sr5XzAyv7bZA12Hl5XNFkVxFtsT1FyKswEDNxM2G9SmzGW7Io77T3sQV/LGzipg2kGV4krobVDZrQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack-extra.min.css" integrity="sha512-287EQpO1sItRDNvuCUARDlhpQs3qLRCMaidpOKp5BFu6EgcX3XxB92jmTvdXWW57Q9ImHcYqIHKx12EATT3sPA==" crossorigin="anonymous" referrerpolicy="no-referrer" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/gridstack.min.css" integrity="sha512-pn/nPcd3DeaEfwRkSD6DFdXrLFoiGhUZ9LjVwzxmaY1LXRG9yooFrWbAzDBidAuN30rw9LmFI8/RMGiD4/1xsA==" crossorigin="anonymous" referrerpolicy="no-referrer" /><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/types.min.js" integrity="sha512-FqFjO4sevT7ilpbvbinXvm1xj1u5qmUclAmocAsOHbPxHob5D2fR3oTYTsSKdjlWBkyiv59qvtyQGNoz1HgYnQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/8.4.0/utils.min.js" integrity="sha512-RR3u9WaZXGE5ajHDwcYoOhz2no/+hpxuA/nZVxuvmOkh7E1XjdH8neykDfow0Ag7IW5GU//3i7Vs13Q2nKX+pw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><link href="cssTheme1.css" rel = "stylesheet" /><link href="app.component.css" rel="stylesheet" /><link href="add-page.component.css" rel="stylesheet" /><body><div class="col-sm-12 col-md-10" style = "padding:0px;"><div class="grid-container"><div class="grid-stack" id = "advanced-grid" style = "width: 1050px;height: 1497.59px; min-height: 1497.6px;"></div></div></div><div id = "advanced-grid"></div></body><script type="text/javascript">;var serializedFull={'margin':0,'column':400,'acceptWidgets':!0,'removable':'#trash','float':!0,'disableOneColumnMode':!0,'children':[{'x':126,'y':7,'w':185,'h':35,'content':'<div><img src=http://localhost:4200/assets/sampleHeader.jpg></img></div>','id':'1017'},{'x':104,'y':46,'w':68,'h':114,'content':'<div><img class="imgcss" src=http://localhost:4200/assets/logosatya.jpg></img></div>','id':'1016'},{'x':301,'y':102,'w':73,'h':14,'content':'<div class="adharnumbercss">0000 1111 2222</div>','id':'1020'},{'x':225,'y':122,'w':76,'h':128,'content':'<div><img class="imgcss" src=http://localhost:4200/assets/logosatya.jpg></img></div>','id':'1016'},{'x':42,'y':160,'w':73,'h':120,'content':'<div><img class="imgcss" src=http://localhost:4200/assets/logosatya.jpg></img></div>','id':'1016'},{'x':134,'y':160,'w':59,'h':59,'content':'<div><img src=http://localhost:4200/assets/sampleAdharQr.jpg></img></div>','id':'1021'},{'x':43,'y':280,'w':185,'h':40,'content':'<div><img src=http://localhost:4200/assets/sampleHeader.jpg></img></div>','id':'1017'}]};grid=GridStack.addGrid(document.querySelector('#advanced-grid'),serializedFull)</script>`;

    // Convert the HTML string to a Blob
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Define the file name and extension (e.g., myFile.html)
    const fileName = 'myFile.html';

    // Save the Blob as a file
    fileSaver.saveAs(blob, fileName);
    this.pagesService.getpdf("C:\\Users\\chaud\\Downloads\\myFile.html");
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

  //generatePDF() {
  //  const doc = new jsPDF({
  //    orientation: "landscape",
  //    unit: "in",
  //    format: [4, 2]
  //  });
  //  // Get the HTML element you want to convert to a PDF
  //  const htmlContentToConvert = '<div><h1>Hello, World!</h1><p>This is a sample HTML content.</p></div>';
  //  const content = document.createElement('div');
  //  content.innerHTML = htmlContentToConvert;

  //  // Convert the HTML element to a canvas using html2canvas
  //  html2canvas(content).then((canvas) => {
  //    // Get the canvas as a data URL
  //    const imgData = canvas.toDataURL('image/png');

  //    // Add the image to the PDF
  //    doc.addImage(imgData, 'JPEG', 0.5, 0.5, 3, 1);

  //    // Save the PDF
  //    doc.save('two-by-four.pdf');
  //  });
  //  //const doc = new jsPDF();

  //  //doc.text("Hello world!", 10, 10);
  //  //doc.save("a4.pdf");

  //  //const htmlContentToConvert = '<div><h1>Hello, World!</h1><p>This is a sample HTML content.</p></div>';
  //  //const content = document.createElement('div');
  //  //content.innerHTML = htmlContentToConvert;
  //  //const pdfOptions = {
  //  //  orientation: 'p',
  //  //  unit: 'mm',
  //  //  format: 'a4',
  //  //};


  //  //html2canvas(content).then(canvas => {
  //  //  const imgData = canvas.toDataURL('image/png');
  //  //  const pdf = new jsPDF(pdfOptions);// Portrait, millimeters, A4 size
  //  //  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // x, y, width, height (A4 size)
  //  //  pdf.save('document.pdf');
  //  //});
  //}
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
