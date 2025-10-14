import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FirewallService } from '../../services/firewall.service';

@Component({
  selector: 'app-firewall-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './firewall-form.html',
  styleUrls: ['./firewall-form.scss'],
})
export class FirewallForm {
  firewallForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private firewallService: FirewallService,
    private router: Router
  ) {
    this.firewallForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    if (this.firewallForm.invalid) {
      this.firewallForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const firewallData = { name: this.firewallForm.value.name };

    this.firewallService.create(firewallData).subscribe({
      next: (createdFirewall) => {
        this.isSubmitting = false;
        this.router.navigate(['/firewalls', createdFirewall.id]);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to create firewall.';
      },
    });
  }

  cancel() {
    this.router.navigate(['/firewalls']);
  }
}
