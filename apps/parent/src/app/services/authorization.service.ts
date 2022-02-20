import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const port = environment.port;
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: string }> {
    return this.http.post<{ token: string; user: string }>(
      `${port}/api/parent/login`,
      {
        email: email,
        password: password,
      }
    );
  }
  logout() {
    this.token.deleteToken();
    this.router.navigate(['/login']);
  }
}
