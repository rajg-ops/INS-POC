import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanService } from '../../services/plan';
import { SubscriptionService } from '../../services/subscription';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css']
})
export class CustomerDashboardComponent implements OnInit {

  plans: any[] = [];
  currentUser: any = null;
  loading = true;
  message = '';

  constructor(
    private planService: PlanService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlans();
    this.loadProfile();
  }

  loadPlans() {
  this.loading = true; // always reset before call

  this.planService.getPlans().subscribe({
    next: (data: any[]) => {
      this.plans = data || [];
      this.loading = false;
    },
    error: (err) => {
      console.error("Error loading plans:", err);
      this.loading = false;
    }
  });
}

 loadProfile() {
  this.authService.getProfile().subscribe({
    next: (data) => {
      if (!data) return;
      this.currentUser = data;
    },
    error: () => {
      this.router.navigate(['/login']);
    }
  });
}

  subscribe(planId: string) {
    this.subscriptionService.subscribe(planId).subscribe({
      next: () => {
        this.message = "Subscribed successfully!";
        this.loadProfile();   // Refresh profile after subscription
      },
      error: (err) => {
        this.message = err.error?.msg || "Subscription failed";
      }
    });
  }

  renew() {
    this.subscriptionService.renew().subscribe({
      next: () => {
        this.message = "Policy renewed successfully!";
        this.loadProfile();   // Refresh profile after renewal
      },
      error: (err) => {
        this.message = err.error?.msg || "Renewal failed";
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}