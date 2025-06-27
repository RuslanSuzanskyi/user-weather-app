import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) { };

  getUsers(): Observable<{results: any[]}> {
    return this.http.get<{results: any[]}>(`${this.usersApiUrl}?results=10`);
  }
}
