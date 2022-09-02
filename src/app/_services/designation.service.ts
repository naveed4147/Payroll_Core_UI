import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../_helper/LoadConfigFile';


@Injectable({
  providedIn: 'root'
})
export class DesignationService {
apiUrl:any
//static ngInjectableDef = undefined
  constructor(
    private http: HttpClient,
    private configService:ConfigService,
    //private _handleError:HandleError
  ) {
    debugger
    this.apiUrl = configService.config.apiUrl + '/Designation/';
   }
   getDesignation():Observable<any> {
    
    return this.http.get(this.apiUrl + 'getDesignation');
  }
  postDesignation(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'postDesignation', formData);
  }


}
