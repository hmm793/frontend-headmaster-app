/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student } from '../models/student';

const port = environment.port;

export interface ranking {
  nama: string;
  kelas: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  AddStudent(data: any): Observable<any> {
    console.log('data:', data);
    return this.http.post<any>(`${port}/api/student/register`, data);
  }
  getTotalStudent(): Observable<any> {
    return this.http.get<any>(`${port}/api/student/count`);
  }
  getAllStudent(): Observable<any> {
    return this.http.get<any>(`${port}/api/student`);
  }
  getMaleStudent(): Observable<any> {
    return this.http.get<any>(`${port}/api/student/totalMale`);
  }
  getFemaleStudent(): Observable<any> {
    return this.http.get<any>(`${port}/api/student/totalFemale`);
  }
  getStudentById(id: any): Observable<Student> {
    return this.http.get<Student>(`${port}/api/student/${id}`);
  }

  editStudentByHeadmaster(id: any, data: Student): Observable<any> {
    return this.http.put<any>(`${port}/api/student/byheadmaster/${id}`, data);
  }

  editStudentImageByHeadmaster(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      `${port}/api/student/byheadmaster/image/${id}`,
      data
    );
  }

  getAllStudentRelatedToTheClass(id: any): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${port}/api/student/getAllStudentRelatedToTheClass/${id}`
    );
  }
  getAllStudentByRankByClass(id: any): Observable<
    {
      _id?: string;
      first_name?: string;
      last_name?: string;
      totalScore?: string;
      id?: string;
    }[]
  > {
    return this.http.get<
      {
        _id?: string;
        first_name?: string;
        last_name?: string;
        totalScore?: string;
        id?: string;
      }[]
    >(`${port}/api/student/getStudentsByRankByClass/${id}`);
  }
}
