import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../_helper/LoadConfigFile';
import { HandleError } from '../_helper/HandleError';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
apiUrl:any

  constructor(
    private http: HttpClient,
    private configService:ConfigService,
    private _handleError:HandleError
  ) {
    this.apiUrl = configService.config.apiUrl + '/UserManagement/';
   }
  getUserList():Observable<any> {
    
    return this.http.get(this.apiUrl + 'GetUsersList').pipe(
      catchError(this._handleError.handleError)
    );
  }
  CreateUser(formData:any) {
    debugger
    return this.http.post(this.apiUrl + 'CreateUser', formData);
  }


}
