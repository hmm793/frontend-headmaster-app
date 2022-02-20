/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}
  setToken(data: any) {
    localStorage.setItem('jwtToken', data);
  }
  getToken() {
    return localStorage.getItem('jwtToken');
  }
  deleteToken() {
    localStorage.removeItem('jwtToken');
  }
}
