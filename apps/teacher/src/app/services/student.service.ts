/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student } from '../models/student';
const link2 = environment.port;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  getAllStudentBySubject(id: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${link2}/api/student/getAllStudentRelatedToTheSubject/${id}`
    );
  }
  getAllStudentByClass(id: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${link2}/api/student/getAllStudentRelatedToTheClass/${id}`
    );
  }
}
