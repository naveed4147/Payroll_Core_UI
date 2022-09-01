import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigService {
    config: Config;
  
    constructor(private http: HttpClient) {}
  
    loadConfig() {
     
      return this.http
        .get<Config>('./assets/config.json')
        .toPromise()
        .then(config => {
          this.config = config;
        });
    }
  }