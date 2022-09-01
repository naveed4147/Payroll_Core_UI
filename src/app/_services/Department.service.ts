import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'app/_helper/LoadConfigFile';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
apiUrl:any

  constructor(
    private http: HttpClient,
    private configService:ConfigService,
   
  ) {
    debugger
    this.apiUrl = configService.config.apiUrl + '/Departments/';
   }
  getDepartment():Observable<any> {
    
    return this.http.get(this.apiUrl + 'GetDeparments');
  }
  InsertDepartment(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'CreateDepartment', formData);
  }


}
