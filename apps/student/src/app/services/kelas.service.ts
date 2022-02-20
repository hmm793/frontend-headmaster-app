import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kelas } from '../models/kelas';

import { environment } from '../../environments/environment';
const link2 = environment.port;

@Injectable({
  providedIn: 'root',
})
export class KelasService {
  constructor(private http: HttpClient) {}
  getAllClass(): Observable<Kelas[]> {
    return this.http.get<Kelas[]>(link2 + '/api/class');
  }
  getClassBySubject(id: any): Observable<Kelas[]> {
    return this.http.get<Kelas[]>(`${link2}/api/class/getClassBySubject/${id}`);
  }
}
