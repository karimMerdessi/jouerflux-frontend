import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedRules, Rule } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private readonly baseUrl = 'http://localhost/rules';

  constructor(private http: HttpClient) {}

  getRules(page: number = 1, perPage: number = 10): Observable<PaginatedRules> {
    return this.http
      .get<PaginatedRules>(`${this.baseUrl}?page=${page}&per_page=${perPage}`)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Rule> {
    return this.http.get<Rule>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(rule: Rule): Observable<Rule> {
    return this.http.post<Rule>(this.baseUrl, rule).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred while communicating with the API.'));
  }
}
