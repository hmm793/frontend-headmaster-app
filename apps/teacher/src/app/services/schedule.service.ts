import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule';

import { environment } from '../../environments/environment';
const link2 = environment.port;

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  // DIPAKE
  getScheduleByID(id: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${link2}/api/schedule/${id}`);
  }
  getScheduleByTeacher(idTeacher: string): Observable<Schedule> {
    return this.http.get<Schedule>(
      `${link2}/api/schedule/byTeacher/${idTeacher}`
    );
  }
}
