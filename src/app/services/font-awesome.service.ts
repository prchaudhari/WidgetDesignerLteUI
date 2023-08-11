import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FontAwesomeService {

  constructor(private http: HttpClient) { }
  getIconClassNames(): Observable<string[]> {
    return this.http.get('node_modules/@fortawesome/fontawesome-free/css/all.min.css', { responseType: 'text' })
      .pipe(map(response => this.extractIconClassNames(response)));
  }

  private extractIconClassNames(cssContent: string): string[] {
    const classNames = cssContent.match(/\.fa-[a-z0-9\-]+/g);
    return classNames ? classNames.map(className => className.substring(1)) : [];
  }
}
  //getIconClasses(): Observable<string[]> {
  //  return this.http.get<string[]>('https://api.fontawesome.com/v5.15/icons');
  //}

