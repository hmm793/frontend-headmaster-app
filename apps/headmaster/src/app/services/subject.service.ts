import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { subject } from '../models/subject';

const port = environment.port;

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${port}/api/subject`);
  }

  AddSubject(data: any): Observable<any> {
    console.log('data:', data);
    return this.http.post<any>(`${port}/api/subject`, data);
  }

  getSubjectById(id: any): Observable<subject> {
    return this.http.get<subject>(`${port}/api/subject/${id}`);
  }

  editSubject(id: any, data: subject): Observable<any> {
    return this.http.put<any>(`${port}/api/subject/${id}`, data);
  }

  deleteSubject(id: any): Observable<any> {
    return this.http.delete<any>(`${port}/api/subject/${id}`);
  }
}
