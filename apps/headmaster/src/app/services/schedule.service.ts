import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Schedule } from '../models/schedule';

const port = environment.port;

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  createSchedule(event: any) {
    return this.http.post(`${port}/api/schedule`, event);
  }

  getAllSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${port}/api/schedule`);
  }

  getScheduleByID(id: string): Observable<Schedule> {
    console.log('IFD : ', id);
    return this.http.get<Schedule>(`${port}/api/schedule/${id}`);
  }

  removeSchedule(id: string): Observable<Schedule> {
    return this.http.delete<Schedule>(`${port}/api/schedule/` + id);
  }

  editSchedule(allEvent: any): Observable<Schedule[]> {
    return this.http.put<Schedule[]>(`${port}/api/schedule`, allEvent);
  }

  editScheduleByID(id: string, data: any): Observable<Schedule> {
    return this.http.put<Schedule>(
      `${port}/api/schedule/editEvent/${id}`,
      data
    );
  }
  getTempSchedule(dataKelas?: any): Observable<Schedule[]> {
    let params = new HttpParams();
    if (dataKelas) {
      params = params.append('schedule', dataKelas.join(','));
    }

    return this.http.get<Schedule[]>(`${port}/api/schedule/tempSchedule`, {
      params: params,
    });
  }
}
