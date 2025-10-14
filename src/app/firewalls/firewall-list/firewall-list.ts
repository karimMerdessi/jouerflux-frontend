import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirewallService } from '../../services/firewall.service';
import { Firewall, FirewallPaginatedResponse } from '../../models/firewall.model';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar/navbar';

@Component({
  selector: 'app-firewall-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './firewall-list.html',
  styleUrl: './firewall-list.scss'
})
export class FirewallList implements OnInit {

  firewalls: Firewall[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  errorMessage = '';

  constructor(private firewallService: FirewallService) {}

  ngOnInit(): void {
    this.loadFirewalls();
  }

  /** Fetch firewalls from API */
  loadFirewalls(page: number = 1): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.firewallService.getFirewalls(page, 10).subscribe({
      next: (response: FirewallPaginatedResponse) => {
        this.firewalls = response.items;
        this.currentPage = response.current_page;
        this.totalPages = response.total_pages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load firewalls.';
        this.isLoading = false;
      }
    });
  }

  confirmDelete(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this firewall?');
    if (confirmed) {
      this.firewallService.delete(id).subscribe({
        next: () => {
          // remove deleted firewall from list
          this.firewalls = this.firewalls.filter(fw => fw.id !== id);
        },
        error: () => {
          alert('Failed to delete firewall.');
        }
      });
    }
    // if cancelled, do nothing
  }

  /** Simple pagination example */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFirewalls(page);
    }
  }
}
