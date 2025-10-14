import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Rule } from '../../models/rule.model';
import { Policy } from '../../models/policy.model';
import { RuleService } from '../../services/rules.service';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-rules-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rules-form.html',
  styleUrls: ['./rules-form.scss'],
})
export class RulesForm implements OnInit {
  rule: Rule = {id: 0,  name: '', policy_id: 0 };
  policies: Policy[] = [];
  isLoadingPolicies = false;
  errorMessage = '';

  constructor(
    private ruleService: RuleService,
    private policyService: PolicyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.isLoadingPolicies = true;
    // Fetch all policies using the frontend loop approach
    const allPolicies: Policy[] = [];
    let page = 1;

    const fetchPage = () => {
      this.policyService.getPolicies(page, 10).subscribe({
        next: (res) => {
          allPolicies.push(...res.items);
          if (res.next_page) {
            page = res.next_page;
            fetchPage(); // fetch next page
          } else {
            this.policies = allPolicies;
            this.isLoadingPolicies = false;
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

  onSubmit(): void {
    if (!this.rule.name || !this.rule.policy_id) {
      alert('Please fill in all fields.');
      return;
    }

    this.ruleService.create(this.rule).subscribe({
      next: () => {
        alert('Rule created successfully!');
        this.router.navigate(['/rules']);
      },
      error: () => {
        alert('Failed to create rule.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/rules']);
  }
}
