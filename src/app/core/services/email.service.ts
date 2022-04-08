import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})

export class EmailService {
    private apiUrl = 'http://localhost:40008/Reijn/Development/Email/Api/email/SendEmail';
  
    constructor(private http: HttpClient,
        private authUserService: AuthService
    ) { }

    sendEmail(emailBody: any) {


        let url = this.apiUrl;
        return this.http.post(url, emailBody);
    }

}