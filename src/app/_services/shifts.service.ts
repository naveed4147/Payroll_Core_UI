import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../_helper/LoadConfigFile';


@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
apiUrl:any
//static ngInjectableDef = undefined
  constructor(
    private http: HttpClient,
    private configService:ConfigService,
    //private _handleError:HandleError
  ) {
    debugger
    this.apiUrl = configService.config.apiUrl + '/Shifts/';
   }
   GetShifts():Observable<any> {
    
    return this.http.get(this.apiUrl + 'GetShifts');
  }
  postShift(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'postShift', formData);
  }


}
