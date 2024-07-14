import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
 private url = 'http://localhost:3000';

  getCustomers(): Observable<any> {
    return this.http.get(`${this.url}/customers`);

  }
  getTransactions(): Observable<any> {
    return this.http.get(`${this.url}/transactions`);
  }
}
