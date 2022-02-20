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

  AddParent(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${port}/api/parent/register`,
      data
    );
  }
  getTotalParent(): Observable<any> {
    return this.http.get<any>(`${port}/api/parent/count`);
  }
  getAllParent(): Observable<any> {
    return this.http.get<any>(`${port}/api/parent`);
  }
  getParentById(id: any): Observable<Parent> {
    return this.http.get<Parent>(`${port}/api/parent/${id}`);
  }
  editParentByHeadmaster(id: any, data: Parent): Observable<any> {
    return this.http.put<any>(`${port}/api/parent/byheadmaster/${id}`, data);
  }
  editParentImageByHeadmaster(id: any, data: any): Observable<any> {
    console.log('Service : ', id);
    console.log('Service : ', data);
    return this.http.put<any>(
      `${port}/api/parent/byheadmaster/image/${id}`,
      data
    );
  }
}
