import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Teacher } from '../models/teacher';

const port = environment.port;

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  AddTeacher(data: any): Observable<any> {
    console.log('data:', data);
    return this.http.post<any>(`${port}/api/teacher/register`, data);
  }
  getTotalTeacher(): Observable<any> {
    return this.http.get<any>(`${port}/api/teacher/count`);
  }
  getAllTeacher(): Observable<any[]> {
    return this.http.get<any[]>(`${port}/api/teacher`);
  }
  getTeacherById(id: any): Observable<Teacher> {
    return this.http.get<Teacher>(`${port}/api/student/${id}`);
  }
  editTeacherByHeadmaster(id: any, data: Teacher): Observable<any> {
    return this.http.put<any>(`${port}/api/teacher/byheadmaster/${id}`, data);
  }
  editTeacherImageByHeadmaster(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      `${port}/api/teacher/byheadmaster/image/${id}`,
      data
    );
  }
  getTeacherByID(idTeacher: any): Observable<Teacher> {
    return this.http.get<Teacher>(`${port}/api/teacher/${idTeacher}`);
  }
}
