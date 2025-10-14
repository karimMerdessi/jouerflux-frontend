import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Firewall, FirewallPaginatedResponse } from '../models/firewall.model';

@Injectable({
  providedIn: 'root'
})
export class FirewallService {
  private readonly baseUrl = 'http://localhost/firewalls';

  constructor(private http: HttpClient) {}

  /** Get all firewalls (paginated) */
  getAll(page: number = 1): Observable<FirewallPaginatedResponse> {
    return this.http
      .get<FirewallPaginatedResponse>(`${this.baseUrl}?page=${page}`)
      .pipe(catchError(this.handleError));
  }

  getFirewalls(page: number = 1, perPage: number = 10): Observable<FirewallPaginatedResponse> {
    return this.http
      .get<FirewallPaginatedResponse>(`${this.baseUrl}?page=${page}&per_page=${perPage}`)
      .pipe(catchError(this.handleError));
  }

  /** Get a single firewall by its ID */
  getById(id: number): Observable<Firewall> {
    return this.http
      .get<Firewall>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Create a new firewall */
  create(firewall: { name: string }): Observable<Firewall> {
    return this.http
      .post<Firewall>(this.baseUrl, firewall)
      .pipe(catchError(this.handleError));
  }

  /** Delete a firewall */
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Centralized error handling */
  private handleError(error: HttpErrorResponse) {
    console.error('FirewallService Error:', error);
    return throwError(() => new Error('Something went wrong with the firewall API'));
  }
}
