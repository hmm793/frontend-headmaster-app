import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { environment } from '../../environments/environment';
// const link1 = 'https://final-project-app-v1.herokuapp.com/api/class';
const link2 = environment.port;
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}
  getAllSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${link2}/api/subject`);
  }
  getSubjectByID(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${link2}/api/subject/${id}`);
  }
}
