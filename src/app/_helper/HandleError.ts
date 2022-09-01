import { Injectable } from '@angular/core';
import {  HttpErrorResponse } from '@angular/common/http';

import { Config } from 'protractor';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class HandleError {
    config: Config;
  
    constructor() {}

    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };
  }