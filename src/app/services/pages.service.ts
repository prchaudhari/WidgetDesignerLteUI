import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pages } from '../models/pages.model';
import { PageModel } from '../models/pagesmodel.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  baseApiUrl: string = "https://localhost:7296";

  constructor(private http: HttpClient) { }

  getAllPages(): Observable<Pages[]> {
    return this.http.get<Pages[]>(this.baseApiUrl + '/api/pages');
  }

  addPage(formData: FormData) {
    //newWidget.id = '00000000-0000-0000-0000-000000000000';  
    return this.http.post<Pages>(this.baseApiUrl + '/api/page', formData);
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
}
