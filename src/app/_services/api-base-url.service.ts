import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseUrlService {
  baseUrl = "http://localhost:49863/api/";

  constructor() { }

  GetBaseUrl(){
    return this.baseUrl;
  }
}
