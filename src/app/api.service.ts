import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MsalService} from '@azure/msal-angular';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:40001/Reijn/Development/Authorization/Api/swagger/v1/';

  constructor(private http: HttpClient, private auth: MsalService) {
//

  }
}
