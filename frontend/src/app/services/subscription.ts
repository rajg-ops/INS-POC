import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private API = 'http://localhost:5000/api/subscription';

  constructor(private http: HttpClient) {}

  subscribe(planId: string): Observable<any> {
    return this.http.post(`${this.API}/subscribe`, { planId });
  }

  renew(): Observable<any> {
    return this.http.post(`${this.API}/renew`, {});
  }
}