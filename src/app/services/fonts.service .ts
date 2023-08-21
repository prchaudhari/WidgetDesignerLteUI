import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fonts } from '../models/fonts.model ';

@Injectable({
  providedIn: 'root'
})
export class FontsService {
  baseApiUrl: string = "https://localhost:44381";

  constructor(private http: HttpClient) { }

  getAllFonts(): Observable<Fonts[]> {
    return this.http.get<Fonts[]>(this.baseApiUrl + '/api/fonts');
  }

}
