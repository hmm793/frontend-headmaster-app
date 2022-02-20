/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student } from '../models/student';
const link2 = environment.port;

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  getStudentByID(id: string): Observable<Student> {
    return this.http.get<Student>(`${link2}/api/student/${id}`);
  }
  editStudent(id: string, data: any): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${link2}/api/student/bystudent/${id}`,
      data
    );
  }
  editStudentImageByStudent(
    idStudent: any,
    data: any
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${link2}/api/student/bystudent/image/${idStudent}`,
      data
    );
  }

  resetPassword(data: { email: string }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${link2}/api/student/reset-password`,
      data
    );
  }
}
