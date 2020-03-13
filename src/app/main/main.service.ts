import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http : HttpClient
  ) { }

  getAccounts(){
    return this.http.get(`${environment.BASE_URL}/api/accounts`)
  }

  initializeTransaction(data){
    return this.http.post(`${environment.BASE_URL}/api/transaction/initialize`, data)
  }

  commitTransaction(transReference, data : {otp : number}){
    return this.http.post(`${environment.BASE_URL}/api/transaction/commit/${transReference}`, data)
  }
}
