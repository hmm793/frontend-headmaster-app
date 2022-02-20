import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const port = environment.port;

@Injectable({
  providedIn: 'root',
})
export class HeadmasterService {
  constructor(private http: HttpClient) {}

  resetPassword(data: { email: string }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${port}/api/headmaster/reset-password`,
      data
    );
  }
}
