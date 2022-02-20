/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Subject } from '../models/subject';
const link2 = environment.port;

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}
  getAllSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${link2}/api/subject`);
  }
}
