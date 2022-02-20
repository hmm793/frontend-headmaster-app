import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Teacher } from '../models/teacher';
// const link1 = 'https://final-project-app-v1.herokuapp.com/api/class';
const link2 = environment.port;
@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  setStudentScore(idSubject: any, data: any): Observable<any> {
    return this.http.post<any>(
      `${link2}/api/teacher/scorring/${idSubject}`,
      data
    );
  }

  getTeacherByID(idTeacher: any): Observable<Teacher> {
    return this.http.get<Teacher>(`${link2}/api/teacher/${idTeacher}`);
  }
  editTeacherByTeacher(
    idTeacher: any,
    data: any
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${link2}/api/teacher/byteacher/${idTeacher}`,
      data
    );
  }
  editTeacherImageByTeacher(
    idTeacher: any,
    data: any
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${link2}/api/teacher/byteacher/image/${idTeacher}`,
      data
    );
  }
  resetPassword(data: { email: string }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${link2}/api/teacher/reset-password`,
      data
    );
  }
}
