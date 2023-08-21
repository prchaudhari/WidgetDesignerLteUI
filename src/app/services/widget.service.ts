import { Injectable } from '@angular/core';
import { Widget } from '../models/widget.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageWidgetsDetails } from '../models/pagewidgetsdetails.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  baseApiUrl: string = "https://localhost:7296";

  constructor(private http: HttpClient) { }

  getAllWidget(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.baseApiUrl + '/api/widgets');
  }

  //addWidget(newWidget: Widget): Observable<Widget> {
  //  //newWidget.id = '00000000-0000-0000-0000-000000000000';
  //  alert("Hi");
  //  return this.http.post<Widget>(this.baseApiUrl + '/api/widgets', newWidget);
  //}
  addWidget(formData: FormData) {
    return this.http.post(this.baseApiUrl + '/api/widgets', formData);
  }


  getWidget(id: number): Observable<Widget> {
    return this.http.get<Widget>(this.baseApiUrl + '/api/widgets/' + id);
  }

  updateWidget(id: number, formData: FormData): Observable<Widget> {
    return this.http.put<Widget>(this.baseApiUrl + '/api/widgets/' + id, formData);
  }

  deleteWidget(id: number): Observable<Widget> {
    return this.http.delete<Widget>(this.baseApiUrl + '/api/widgets/' + id);
  }

  getAssetCssFiles(): Observable<string[]> {
    // Replace with your backend API endpoint that serves the list of files
    //alert("servcies");
    return this.http.get<string[]>('/api/assets/dynamicThemes');
  }
  getPageWidgets(id:number): Observable<PageWidgetsDetails[]> {
    return this.http.get<PageWidgetsDetails[]>(this.baseApiUrl + '/api/widgets/pagewidgets/' + id);
  }

}
