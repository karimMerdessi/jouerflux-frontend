import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Policy, PolicyPaginatedResponse } from '../models/policy.model';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private readonly baseUrl = 'http://localhost/policies';

  constructor(private http: HttpClient) {}

  /**
   * Fetch paginated list of policies.
   * @param page Page number (default 1)
   * @param per_page Number of items per page (default 10)
   */
  getPolicies(page = 1, per_page = 10): Observable<PolicyPaginatedResponse> {
    return this.http
      .get<PolicyPaginatedResponse>(`${this.baseUrl}?page=${page}&per_page=${per_page}`)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(policy: Policy): Observable<Policy> {
    return this.http
      .post<Policy>(this.baseUrl, policy)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('PolicyService error:', error);
    return throwError(() => new Error('An error occurred while processing policies.'));
  }
}
