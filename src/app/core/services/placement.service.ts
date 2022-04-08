import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {
 mainPath = environment.origin;

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getplacements(declarationType: number= 1, invoiceType= 1){
      let url = `${this.mainPath}Reijn/Development/Placement/Api/Placement/Search?declarationType=${declarationType}&invoiceType=${invoiceType}`;

      // if (search) { url = `${url}&searchTerm=${search}`; }

      return this.http.get(url);
  }

  // tslint:disable-next-line:typedef
  getProjectByplacement(placement){
    const url = `${this.mainPath}Reijn/Development/Placement/Api/Project/ListByPlacement?placementKey=${placement}`;

    return this.http.get(url);
  }

/*  getPlacements2(pageNumber= 1, pageSize = 1, search = null){
    let url = `${this.mainPath}Reijn/Development/Placement/Api/Placement/Paged?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (search) { url = `${url}&searchTerm=${search}`; }

    return this.http.get(url);
  }*/
}
