import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FirewallService } from '../../services/firewall.service';

@Component({
  selector: 'app-firewall-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './firewall-detail.html',
  styleUrl: './firewall-detail.scss'
})
export class FirewallDetail implements OnInit {
  firewall: any;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private firewallService: FirewallService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idN= Number(id); 
      this.firewallService.getById(idN).subscribe({
        next: (data) => {
          this.firewall = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load firewall details.';
          this.isLoading = false;
        },
      });
    }
  }
}
