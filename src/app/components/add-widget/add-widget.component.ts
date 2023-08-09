import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Widget } from '../../models/widget.model';
import { WidgetService } from '../../services/widget.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import * as jsrender from 'jsrender';
@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddWidgetComponent {
  selectedFile!: File;
  url: string = "assets/img.jpg";
  @ViewChild('renderTarget') renderTarget?: ElementRef;
  renderedTemplate = ''; // Store the rendered template here
  ckeditorContent: any;
  htmltextvalue: string = "";
  WidgetHtml: string = "";
  cssname: string = "";
  imageFile: File;
  newWidget: Widget = {
    id: 0,
    widgetName: '',
    description: '',
    dataSourceJson: '',
    WidgetHtml: '',
    widgetCSS: '',
    widgetCSSUrl: '',
    WidgetIconUrl: '',
    width: 0,
    height: 0,
    dataBindingJsonNode: '',
    fontName: '',
    startCol: 0,
    startRow: 0,
  };

  constructor(
    private http: HttpClient,
    private widgetService: WidgetService,
    private router: Router
  ) { }

  appendCss(customData: string) {

    $(document).ready(function () {
      $("style").append(customData);
    });
  }
 
  addWidget() {    
    const formData = new FormData();
    formData.append('widgetName', this.newWidget.widgetName);
    formData.append('description', this.newWidget.description);
    formData.append('dataSourceJson', this.newWidget.dataSourceJson);
    formData.append('WidgetHtml', this.newWidget.WidgetHtml);
    formData.append('width', this.newWidget.width.toString());
    formData.append('height', this.newWidget.height.toString());
    formData.append('WidgetIconUrl', this.imageFile);

    this.widgetService.addWidget(formData).subscribe({
      next: (widget) => {
        //1 this.router.navigate(['widget']);
        alert("data saved successfully");
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  
  goToNewPage(css :string): void {
    this.router.navigate(['/widgetpreview', css]);
  }

  ShowPreview(cssName:string) {
  
    var jsonObject1: any = JSON.parse(this.newWidget.dataSourceJson);
   
    
    const renderedHtml = jsrender.templates(this.newWidget.WidgetHtml).render({ employees: jsonObject1 });
    localStorage.setItem('widgethtml', renderedHtml);
    //const dataToSend = { key: renderedHtml }; // Data to be sent
    //const navigationExtras: NavigationExtras = {
    //  state: {
    //    data: dataToSend
    //  }
    //};
   // alert("css= " + cssName);
    const url = this.router.createUrlTree(['/widgetpreview', '']);
    window.open(url.toString(), '_blank'); // Open in a new tab
    //this.router.navigate(['/widgetpreview', this.cssname]);
  
    // Insert the rendered HTML into the table container
   // this.renderedTemplate = renderedHtml;
    //const template = jsrender.templates(this.newWidget.WidgetHtml); // Compile the template
    //this.renderedTemplate = template.render(jsonObject1); // Render the template with data
  }
    
  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageFile = e.target.files[0];
      reader.onload = (event: any) => {
        alert(event.target.result);
        this.url = event.target.result;
      }
    }
  }

  mapping(htmltext: string, jsonval: string, customizeFormData: string): void {
    alert(this.newWidget.WidgetHtml + this.newWidget.dataSourceJson + " desc" + this.newWidget.description);
    // var htmltext: string="";
    var jsonObject1: any = JSON.parse(jsonval);

    var newstr = "";
    // htmltext = this.newWidget.WidgetHtml;
    newstr = this.newWidget.WidgetHtml;
    this.htmltextvalue = newstr;
    if (!(jsonObject1 instanceof Array)) {
      var indices = getIndicesOf("@@", htmltext, true);
      var indiceshash = getIndicesOf("##", htmltext, true);
      for (let r = 0; r < indices.length; r++) {
        var str = this.htmltextvalue.slice(indices[r] + 2, indiceshash[r]);
        var rgex = new RegExp('@@' + str + '##', "gi");
        newstr = newstr.replace(rgex, GetJsonAttrValue(jsonObject1, str));
      }
      this.htmltextvalue = newstr;
    }
    else if (jsonObject1.length == 1) {
      console.log(jsonObject1.length);
      var indices = getIndicesOf("@@", htmltext, true);
      //console.log(indices + " len = " + indices.length);
      var indiceshash = getIndicesOf("##", htmltext, true);
      // console.log(indiceshash + " len = " + indiceshash.length);
      for (let r = 0; r < indices.length; r++) {
        var str = this.htmltextvalue.slice(indices[r] + 2, indiceshash[r]);
        var rgex = new RegExp('@@' + str + '##', "gi");
        newstr = newstr.replace(rgex, GetJsonAttrValue(jsonObject1[0], str));
        //  console.log("new= " + ReadValue(jsonObject1, str) + "\n");
        // console.log(str + " substring = " + str.length + "\n" + "str1 = " + str1 );  // ` jsonObject1[str1[0]][str1[1]]);
      }
      this.htmltextvalue = newstr;
    }
    else {
      var repeatString = string_between_strings('<repeat>', '</repeat>', htmltext)
      var firstString = htmltext.slice(0, htmltext.indexOf('<repeat>'));
      var lastString = htmltext.slice(htmltext.indexOf('</repeat>') + 9, htmltext.length);
      // alert("Final = " + repeatString);
      // var forindices = getIndicesOf("*ngFor=\"let", htmltext, true);
      //if (forindices.length > 0) {
      let finalhtml = "";
      var hashes = repeatString.slice(repeatString.indexOf('let') + 3).split('of');
      console.log("hashses = " + hashes);
      for (let count = 0; count < jsonObject1.length; count++) {
        var newstr1 = "";
        newstr = repeatString;
        var indices = getIndicesOf("@@", repeatString, true);
        //console.log(indices + " len = " + indices.length);
        var indiceshash = getIndicesOf("##", repeatString, true);
        // console.log(indiceshash + " len = " + indiceshash.length);
        for (let r = 0; r < indices.length; r++) {
          newstr1 = newstr;
          var str = repeatString.slice(indices[r] + 2, indiceshash[r]);
          var rgex = new RegExp('@@' + str + '##', "gi");
          var attributeValue = GetJsonAttrValue(jsonObject1[count], str);
          newstr = newstr1.replace(rgex, attributeValue == undefined ? "" : attributeValue);
        }
        finalhtml = finalhtml + newstr;
        //  }
        this.htmltextvalue = firstString + finalhtml; + lastString;
      }
    }       //else end


    function string_between_strings(startStr: any, endStr: string, str: string) {
      var pos = str.indexOf(startStr) + startStr.length;
      return str.substring(pos, str.indexOf(endStr, pos));
    }

    function GetJsonAttrValue(jsonObject1: any, varname: any) {
      var v = varname.split(".");
      var o = jsonObject1;
      if (!v.length)
        return undefined;
      for (var i = 0; i < v.length - 1; i++)
        o = o[v[i]];

      var result = o[v[v.length - 1]]
      return result;
    }

    function GetJsonAttrValueForRepeat(jsoniterate: any, jsonObject1: any, varname: any) {
      var newv = varname.toString().replace(jsoniterate.trim() + ".", "");
      console.log("After removing json string = " + newv);
      var v = newv.split(".");

      var o = jsonObject1;
      if (!v.length)
        return undefined;
      for (var i = 0; i < v.length - 1; i++)
        o = o[v[i]];

      var result = o[v[v.length - 1]]
      return result;
    }


    function getIndicesOf(searchStr: string, str: string, caseSensitive: any) {
      var startIndex = 0, index, indices = [];
      if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
      }
      while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + 1;
      }
      return indices;
    }
  }
}
