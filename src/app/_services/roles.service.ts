import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'app/_helper/LoadConfigFile';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
apiUrl:any
//static ngInjectableDef = undefined
  constructor(
    private http: HttpClient,
    private configService:ConfigService,
    //private _handleError:HandleError
  ) {
    debugger
    this.apiUrl = configService.config.apiUrl + '/RoleManagement/';
   }
   RolesList():Observable<any> {
    
    return this.http.get(this.apiUrl + 'getRoles');
  }
  postRoles(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'postRoles', formData);
  }


}
