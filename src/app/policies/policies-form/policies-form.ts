import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Policy } from '../../models/policy.model';
import { Firewall } from '../../models/firewall.model';
import { PolicyService } from '../../services/policy.service';
import { FirewallService } from '../../services/firewall.service';
@Component({
  selector: 'app-policies-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policies-form.html',
  styleUrls: ['./policies-form.scss']
})
export class PoliciesForm implements OnInit {
  policy: Partial<Policy> = { name: '', firewall_id: undefined };
  firewalls: Firewall[] = [];
  isLoadingFirewalls = false;
  errorMessage = '';

  constructor(
    private policyService: PolicyService,
    private firewallService: FirewallService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllFirewalls();
  }

  /** Recursively load all pages of firewalls */
  private loadAllFirewalls(): void {
    this.isLoadingFirewalls = true;
    this.firewalls = [];
    this.fetchFirewallPage(1);
  }

  private fetchFirewallPage(page: number): void {
    this.firewallService.getFirewalls(page, 10).subscribe({
      next: (response) => {
        this.firewalls.push(...response.items);

        if (response.next_page) {
          this.fetchFirewallPage(response.next_page);
        } else {
          this.isLoadingFirewalls = false;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load firewalls.';
        this.isLoadingFirewalls = false;
      },
    });
  }

  /** Create new policy */
  onSubmit(): void {
    if (!this.policy.name || !this.policy.firewall_id) {
      alert('Please fill all fields.');
      return;
    }

    this.policyService.create(this.policy as Policy).subscribe({
      next: () => {
        alert('Policy created successfully!');
        this.router.navigate(['/policies']);
      },
      error: () => {
        alert('Failed to create policy.');
      },
    });
  }

  goBack(): void {
  this.router.navigate(['/policies']);
}
}
