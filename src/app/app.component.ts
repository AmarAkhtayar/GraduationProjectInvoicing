import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
// import {ApiService} from './api.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // title = 'invoice-system';
  //detail: any;
  private apiUrl = 'http://localhost:40001/Reijn/Development/Authorization/Api';
  destroyed = new Subject();
  constructor(private msalService: MsalService,
    private http: HttpClient,
    private router: Router,
    private authUserService: AuthService,
    // private apiService: ApiService
  ) {
  }


  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(res => {
      console.log('handle promise', res);
      if (!res) return
      this.authUserService.setUser(res.idToken);

      this.getAuthorize(res.account);
      //  this.getAuthorizeDetail();
      //  if (res != null && res.account != null) {
      //   this.msalService.instance.setActiveAccount(res.account);
      // }
    });

  }

  getAuthorize(account: any): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.authUserService.getUser());
    console.log('get user', this.authUserService.getUser());
    this.http.get(this.authUserService.apiUrl + '/Authorize/AuthorizeUser', { headers })
      .subscribe(res => {
        console.log('LOGIN ====>', res);
        this.authUserService.setJWTToken(res);

        if (res != null && account != null) {
          console.log('account ===>', account);
          console.log('resss ===>', res);
          this.getAuthorizeDetail(account);

           this.msalService.instance.setActiveAccount(account);
           this.router.navigate(['/'])
        }
      });
  }
  getAuthorizeDetail(account) {
    console.log('get authorize details', this.apiUrl);
    const headers: any = this.authUserService.getJWTToken();
    this.http.get(this.apiUrl + '/Authorize/Details', { headers })
      .subscribe((res: any) => {

        this.authUserService.setUserInfo(JSON.stringify(res))
        this.authUserService.userSubject.next(true)

        console.log(res.claims[0].value, 'details ====>', res);
        this.msalService.instance.setActiveAccount(account);
        this.router.navigate(['/'])
        if (res.claims[0] && res.claims[0].value != "Supplier"){
       
          this.msalService.logout();
          localStorage.removeItem('IDTOKEN')
          localStorage.removeItem('JWt')
          localStorage.removeItem('USER')
          this.router.navigate(['/'])
        }
          
      });
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logout();
  }

  ngOnDestroy(): void {
  }

}
