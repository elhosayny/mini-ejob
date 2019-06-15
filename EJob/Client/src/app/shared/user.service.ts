import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(user: User) {
    return this.httpClient.post('/api/user/register', user);
  }

  login(user:User){
    return this.httpClient.post("/api/user/login",user);
  }
}
