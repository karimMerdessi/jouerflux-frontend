import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FirewallService } from './firewall.service';
import { Firewall, FirewallPaginatedResponse } from '../models/firewall.model';

describe('FirewallService', () => {
  let service: FirewallService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FirewallService]
    });

    service = TestBed.inject(FirewallService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all firewalls (paginated)', () => {
    const mockResponse: FirewallPaginatedResponse = {
      current_page: 1,
      items: [
        { id: 1, name: 'FW1' },
        { id: 2, name: 'FW2' }
      ],
      next_page: 2,
      prev_page: null,
      total_pages: 2
    };

    service.getAll(1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost/firewalls?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch firewalls with custom perPage', () => {
    const mockResponse: FirewallPaginatedResponse = {
      current_page: 1,
      items: [{ id: 1, name: 'FW1' }],
      next_page: null,
      prev_page: null,
      total_pages: 1
    };

    service.getFirewalls(1, 1).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost/firewalls?page=1&per_page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a firewall by ID', () => {
    const mockFirewall: Firewall = { id: 1, name: 'FW1' };

    service.getById(1).subscribe((res) => {
      expect(res).toEqual(mockFirewall);
    });

    const req = httpMock.expectOne('http://localhost/firewalls/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockFirewall);
  });

  it('should create a new firewall', () => {
    const newFirewall = { name: 'FW New' };
    const mockResponse: Firewall = { id: 3, name: 'FW New' };

    service.create(newFirewall).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost/firewalls');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newFirewall);
    req.flush(mockResponse);
  });

 it('should delete a firewall', () => {
  service.delete(1).subscribe((res) => {
    expect(res).toBeNull();
  });

  const req = httpMock.expectOne('http://localhost/firewalls/1');
  expect(req.request.method).toBe('DELETE');
  req.flush(null);
});

  it('should handle errors', () => {
    service.getById(999).subscribe({
      next: () => fail('should have failed with 404'),
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe('Something went wrong with the firewall API');
      }
    });

    const req = httpMock.expectOne('http://localhost/firewalls/999');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
