import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../_helper/LoadConfigFile';


@Injectable({
  providedIn: 'root'
})
export class MedicalInsuranceService {
apiUrl:any
//static ngInjectableDef = undefined
  constructor(
    private http: HttpClient,
    private configService:ConfigService,
    //private _handleError:HandleError
  ) {
    debugger
    this.apiUrl = configService.config.apiUrl + '/MedicalInsurance/';
   }
   GetMedicalInsurance():Observable<any> {
    
    return this.http.get(this.apiUrl + 'GetMedicalInsurance');
  }
  PostMedicalInsurance(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'PostMedicalInsurance', formData);
  }


}
