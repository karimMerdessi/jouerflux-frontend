import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Policy } from '../../models/policy.model';
import { PolicyService } from '../../services/policy.service';
import { FirewallService } from '../../services/firewall.service';
import { Firewall } from '../../models/firewall.model';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar/navbar';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './policies-list.html',
  styleUrls: ['./policies-list.scss'],
})
export class PoliciesList implements OnInit {
  policies: Policy[] = [];
  firewalls: Firewall[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  isLoading = true;
  isLoadingFirewalls = false;
  errorMessage = '';

  constructor(
    private policyService: PolicyService,
    private firewallService: FirewallService
  ) {}

  ngOnInit(): void {
    this.loadFirewalls();
  }

  // Fetch all firewalls first
  loadFirewalls(): void {
    this.isLoadingFirewalls = true;
    const allFirewalls: Firewall[] = [];
    let page = 1;

    const fetchPage = () => {
      this.firewallService.getFirewalls(page, 10).subscribe({
        next: (res) => {
          allFirewalls.push(...res.items);
          if (res.next_page) {
            page = res.next_page;
            fetchPage();
          } else {
            this.firewalls = allFirewalls;
            this.isLoadingFirewalls = false;
            this.loadPolicies(this.currentPage);
          }
        },
        error: () => {
          this.errorMessage = 'Failed to load firewalls.';
          this.isLoadingFirewalls = false;
        },
      });
    };

    fetchPage();
  }

  loadPolicies(page = this.currentPage) {
    this.isLoading = true;
    this.policyService.getPolicies(page, this.perPage).subscribe({
      next: (data) => {
        // Map firewall_id to firewall name for display
        this.policies = data.items.map((policy) => {
          const firewall = this.firewalls.find((f) => f.id === policy.firewall_id);
          return {
            ...policy,
            firewallName: firewall ? firewall.name : `Firewall ID: ${policy.firewall_id}`,
          };
        });
        this.currentPage = data.current_page;
        this.totalPages = data.total_pages;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load policies.';
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.loadPolicies(page);
  }

  confirmDelete(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this policy?');
    if (confirmed) {
      this.policyService.delete(id).subscribe({
        next: () => {
          this.policies = this.policies.filter((p) => p.id !== id);
          this.loadPolicies(this.currentPage);
        },
        error: () => {
          alert('Failed to delete policy.');
        },
      });
    }
  }
}
