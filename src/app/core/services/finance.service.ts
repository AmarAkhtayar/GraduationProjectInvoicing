import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class FinanceService {
    mainPath = environment.FinancePath;
  
    constructor(private http: HttpClient,
        private authUserService: AuthService
    ) { }

    getDeclarationListByProjectForSupplier(projectKey: string, declarationStatus: any = 3) {
        let url = `${this.mainPath}Reijn/Development/Finance/Api/Declaration/ListByProjectForSupplier?projectKey=${projectKey}&declarationStatus=${declarationStatus}`;
        return this.http.get(url);
    }
    getInvoicePagedForSupplier(pageNumber: any, pageSize: any, sortingOrder: any = null, sortingDirection: any = null, searchTerm: any = null) {
        let url = `${this.mainPath}Reijn/Development/Finance/Api/Invoice/PagedForSupplier?pageNumber=${pageNumber}&pageSize=${pageSize}`;

        if (searchTerm) url = `${url}&searchTerm=${searchTerm}`
        if (sortingDirection) url = `${url}&sortingDirection=${sortingDirection}`
        if (sortingOrder) url = `${url}&sortingOrder=${sortingOrder}`
        return this.http.get(url);
    }


    createInvoice(inviceoBody: any, requestid: any) {

        const headers = new HttpHeaders().set('x-requestid', requestid);

        let url = `${this.mainPath}Reijn/Development/Finance/Api/Invoice/CreateDebitInvoice`;
        // let url = `http://localhost:40004/Reijn/Development/Finance/Api/Invoice/CreateInvoie`;
        return this.http.post(url, inviceoBody, { headers });
    }
  
    getInvoiceDetails(key: any){
        let url = `${this.mainPath}Reijn/Development/Finance/Api/Invoice/DetailsForSupplier?key=${key}`;
        return this.http.get(url);
    }
    DownloadInvoice(key: any){
        let url = `${this.mainPath}Reijn/Development/Finance/Api/Invoice/DownloadInvoice?key=${key}`;
        return this.http.get(url);
    }

}

