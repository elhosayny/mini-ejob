import { TokenService } from './token.service';
import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,private tokenService:TokenService) { }

  register(user: User) {
    return this.httpClient.post('/api/user/register', user);
  }

  login(login:Login){
    return this.httpClient.post("/api/user/login",login);
  }

  isAuthenticated()
  {
    return this.tokenService.get() != null;
  }
}
