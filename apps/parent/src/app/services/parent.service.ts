/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Parent } from '../models/parent';

const port = environment.port;

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(private http: HttpClient) {}

  getParentById(id: any): Observable<Parent> {
    return this.http.get<Parent>(`${port}/api/parent/${id}`);
  }
  editByParent(id: any, data: any): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${port}/api/parent/byparent/${id}`,
      data
    );
  }
  editParentImageByParent(id: any, data: any): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${port}/api/parent/byparent/image/${id}`,
      data
    );
  }
  resetPassword(data: { email: string }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${port}/api/parent/reset-password`,
      data
    );
  }
}
