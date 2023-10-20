import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageGenerationLog } from '../models/pages-generator.model';

@Injectable({
  providedIn: 'root'
})
export class PageGenerationLogService {
  baseApiUrl: string = "https://localhost:44381";

  constructor(private http: HttpClient) { }


  

  getAllPages(): Observable<PageGenerationLog[]> {
    return this.http.get<PageGenerationLog[]>(this.baseApiUrl + '/api/pageGenerationLog');
  }

  addPageGenerationLog(formData: any) {
    return this.http.post<PageGenerationLog>(this.baseApiUrl + '/api/pageGenerationLog', formData);
  }

  //updatePagesGenerator(id: number, updatePagesGeneratorRequest: PageGenerationLog): Observable<PageModel> {
  //  return this.http.put<PageGenerationLog>(this.baseApiUrl + '/api/pages/' + id, updatepagerequest);
  //}

  getPageGenerationLog(id: number): Observable<PageGenerationLog> {
    return this.http.get<PageGenerationLog>(this.baseApiUrl + '/api/pageGenerationLog/' + id);
  }

  GetPageGenerationLogsByPageId(pageid: number): Observable<PageGenerationLog> {
    return this.http.get<PageGenerationLog>(this.baseApiUrl + '/api/pageGenerationLog/' + pageid);
  }


  deletePageGenerationLog(id: number): Observable<PageGenerationLog> {
    return this.http.delete<PageGenerationLog>(this.baseApiUrl + '/api/pageGenerationLog/' + id);
  } 


  CreatePdfs(templateid: number): Observable<boolean> {
    alert('hi');
    return this.http.post<boolean>(this.baseApiUrl + '/api/Documents/CreatePDfs', templateid);
    // alert(filename);
    //return this.http.get<boolean>(this.baseApiUrl + '/api/pages/api/GetPDF?filepath="' + filename + '"');
    //  this.http.post<boolean>(this.baseApiUrl + '/api/Documents/GetPDF',filename);
    //this.http.post<boolean>(this.baseApiUrl + '/api/Documents/CreatePDfs', templateid)
    //  .subscribe(
    //    result => {
    //      // Handle the response from the C# controller
    //    },
    //    error => {
    //      console.error('Error:', error);
    //    }
    //  );
   // return true;
    //return this.http.get<boolean>("https://localhost:44381/api/Documents/api/GetPDF?filepath=C:\Users\chaud\Downloads\myFile.html");
  }
}
