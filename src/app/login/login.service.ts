import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http : HttpClient,
    private router : Router,
  ) { }

  logOut(){
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigateByUrl("/auth/login")
  }

  isLoggedIn(){
    return !isNullOrUndefined(localStorage.getItem("access_token"))
  }

  login(form){
    return this.http.post(`${environment.BASE_URL}/api/auth/login`, form)
  }
}
