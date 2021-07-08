import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getData(){
    this.http.get('')
    var res = this.http.get('/api/zipcode')
    console.log(res)
    return res
  }
}
