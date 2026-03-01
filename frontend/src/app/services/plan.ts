import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private API = 'http://localhost:5000/api/plans';

  constructor(private http: HttpClient) {}

  getPlans(): Observable<any[]> {   // ✅ MUST return array
    return this.http.get<any[]>(this.API);
  }
}