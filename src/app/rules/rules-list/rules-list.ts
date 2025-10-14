import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Rule } from '../../models/rule.model';
import { RuleService } from '../../services/rules.service';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy.model';
import { Navbar } from '../../navbar/navbar/navbar';

@Component({
  selector: 'app-rules-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './rules-list.html',
  styleUrls: ['./rules-list.scss'],
})
export class RulesList implements OnInit {
  rules: Rule[] = [];
  policies: Policy[] = [];
  isLoading = false;
  isLoadingPolicies = false;
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;

  constructor(
    private ruleService: RuleService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  // Load all policies first, so we can display their names
  loadPolicies(): void {
    this.isLoadingPolicies = true;
    const allPolicies: Policy[] = [];
    let page = 1;

    const fetchPage = () => {
      this.policyService.getPolicies(page, 10).subscribe({
        next: (res) => {
          allPolicies.push(...res.items);
          if (res.next_page) {
            page = res.next_page;
            fetchPage();
          } else {
            this.policies = allPolicies;
            this.isLoadingPolicies = false;
            this.loadRules(this.currentPage);
          }
        },
        error: () => {
          this.errorMessage = 'Failed to load policies.';
          this.isLoadingPolicies = false;
        },
      });
    };

    fetchPage();
  }

  loadRules(page: number): void {
    this.isLoading = true;
    this.ruleService.getRules(page, 10).subscribe({
      next: (response) => {
        // Map policy_id to policy name for display
        this.rules = response.items.map((rule) => {
          const policy = this.policies.find((p) => p.id === rule.policy_id);
          return {
            ...rule,
            policyName: policy ? policy.name : `Policy ID: ${rule.policy_id}`,
          };
        });
        this.currentPage = response.current_page;
        this.totalPages = response.total_pages;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load rules.';
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadRules(page);
    }
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this rule?')) {
      this.ruleService.delete(id).subscribe({
        next: () => {
          this.rules = this.rules.filter((r) => r.id !== id);
        },
        error: () => {
          alert('Failed to delete rule.');
        },
      });
    }
  }
}
