import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl = 'http://localhost:40001/Reijn/Development/Authorization/Api';
  userSubject = new BehaviorSubject(false)
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  isAuthenticated() {

    return localStorage.getItem('JWt');
  }

  // tslint:disable-next-line:typedef
  setUser(user: any) {
    localStorage.setItem('IDTOKEN', user);
  }

  // tslint:disable-next-line:typedef
  getUser() {
    return localStorage.getItem('IDTOKEN');
  }


  setJWTToken(user: any) {
    localStorage.setItem('JWt', user);
  }

  setUserInfo(user: any) {
    localStorage.setItem('USER', user);
  }


  getJWTToken() {
    return localStorage.getItem('JWt');
  }

  getUserInfo() {
    let user = localStorage.getItem('USER');
    return JSON.parse(user)
  }

  // getAuthorize() {
  //   console.log('get authorize check in service',this.getUser());
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.getUser());
  //   return this.http.get(this.apiUrl + '/Authorize/AuthorizeUser', { headers })

  // }

}
