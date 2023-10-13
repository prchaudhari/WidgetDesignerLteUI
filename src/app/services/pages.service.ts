import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pages } from '../models/pages.model';
import { PageModel } from '../models/pagesmodel.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  baseApiUrl: string = "https://localhost:44381";

  constructor(private http: HttpClient) { }

  getAllPages(): Observable<Pages[]> {
    return this.http.get<Pages[]>(this.baseApiUrl + '/api/pages');
  }

  addPage(formData: any) {
    //newWidget.id = '00000000-0000-0000-0000-000000000000';  
    return this.http.post<Pages>(this.baseApiUrl + '/api/pages', formData);
  }
  //addWidget(formData: FormData) {
  //  return this.http.post(this.baseApiUrl + '/api/pages', formData);
  //}
 


  getPage(id: number): Observable<Pages> {
    return this.http.get<Pages>(this.baseApiUrl + '/api/pages/' + id);
  }

  updatePage(id: number, updatepagerequest: PageModel): Observable<PageModel> {
    return this.http.put<PageModel>(this.baseApiUrl + '/api/pages/' + id, updatepagerequest);
  }


  deletePage(id: number): Observable<Pages> {
    return this.http.delete<Pages>(this.baseApiUrl + '/api/pages/' + id);
  } 
  //g

  getCssContent(): string{
    let mainGridWidth: number = 1750, mainWidth: number = 2000;
    let anyClassx: number = 1260;
    var cssContent = "\r\n.main {{\r\n  background-color: #2F3034; width: " + mainWidth +"2000px;} \
      .maingrid { \
        width: "+ mainGridWidth +"px; \
    /*background-color: aqua;*/ \r\n}}\r\n\r\n \
      #main1 {\r\n  /*padding-top: 10px;*/\r\n  border: 1px solid grey;\r\n \
      width: "+ mainGridWidth +"px;} \
      ::ng-deep.grid - stack { \
        position: relative; \
        width: "+ mainGridWidth +"px; \
       }\r\n\r\n \
      .grid-container {{\r\n  border: 1px solid grey;\r\n}}\r\n\r\n.center {{\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}}\r\n\r\n \
      .grid-stack-item {{\r\n  border: 0;\r\n  overflow: hidden;\r\n}}\r\n\r\n.grid-stack-item-content {{\r\n  background-color: white;\r\n  text-align: center;\r\n}}\r\n\r\n \
      h1 {{\r\n  text-align: center;\r\n  font-size: 3rem;\r\n  margin-top: 2rem;\r\n  margin-bottom: 1.5rem;\r\n}}\r\n\r\n \
      .card {{\r\n  background: none;\r\n}}\r\n\r\nsection {{\r\n  padding: 0 15px 0 15px;\r\n}}\r\n\r\n \
      .grid-stack-item-removing {{\r\n  opacity: 0.8;\r\n  filter: blur(5px);\r\n}}\r\n\r\n \
      @media all and (max-width: 575px) {{\r\n  #hero {{\r\n    margin-top: 32px;\r\n  }}\r\n}}\r\n\r\n \
      .logo {{\r\n  display: inline;\r\n  margin-right: 15px;\r\n}}\r\n\r\n \
      #trash {{\r\n  background-color: #cc6857;\r\n}}\r\n\r\n \
      .newWidget > .grid-stack-item-content {{\r\n  background-color: #6cad84;\r\n}}\r\n \
       .overflowtext {{\r\n    color: blue;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n \
       overflow-x: hidden;\r\n    width: 10px;\r\n    background-color:aqua;\r\n  }}\r\n \
      .clearfix1{{\r\n     text-align:center;\r\n  }}\r\n\r\n.rounded-3 {{\r\n   border: 1px solid grey;\r\n  padding: 3px;\r\n}}\r\n\r\n\r\n  \
       .text-white {{\r\n    text-align: center;\r\n  }}\r\n.anyClass {{\r\n  height: 600px;\r\n  overflow-y: scroll;\r\n}}\r\n \
      .anyClassx {{\r\n  width:"+ anyClassx +"px;\r\n  overflow-x: scroll;\r\n}}\r\n\r\n \
      .btn1 {{\r\n  background-color: rgba(52,58,64,255);\r\n  color: white;\r\n  border: 1px solid #80bdff;\r\n}}\r\n";
    return cssContent;
  }

  getpdf(filename: string): Observable<boolean> {
    alert(filename);
    return this.http.get<boolean>(this.baseApiUrl + '/api/Documents/api/GetPDF?filepath="' + filename+'"');
    //return this.http.get<boolean>("https://localhost:44381/api/Documents/api/GetPDF?filepath=C:\Users\chaud\Downloads\myFile.html");
  }
}
