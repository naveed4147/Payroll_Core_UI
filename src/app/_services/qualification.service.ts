import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'app/_helper/LoadConfigFile';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
apiUrl:any
//static ngInjectableDef = undefined
  constructor(
    private http: HttpClient,
    private configService:ConfigService,
    //private _handleError:HandleError
  ) {
    debugger
    this.apiUrl = configService.config.apiUrl + '/Qualification/';
   }
   getQualification():Observable<any> {
    
    return this.http.get(this.apiUrl + 'GetQualification');
  }
  postQualification(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'postQualification', formData);
  }


}
