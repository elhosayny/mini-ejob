import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public get()
  {
    return localStorage.getItem("token");
  }

  public save(value)
  {
    localStorage.setItem("token",value);
  }
}
