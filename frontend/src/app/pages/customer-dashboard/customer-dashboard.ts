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
  }

 loadPlans() {
  console.log("Calling getPlans()...");

  this.planService.getPlans().subscribe({
    next: (data: any[]) => {
      console.log("Plans received:", data);

      this.plans = data || [];
      this.loading = false;

      console.log("Loading set to:", this.loading);
    },
    error: (err) => {
      console.error("Error loading plans:", err);
      this.loading = false;
    }
  });
}

  subscribe(planId: string) {
    this.subscriptionService.subscribe(planId).subscribe({
      next: () => {
        this.message = "Subscribed successfully!";
      },
      error: (err) => {
        this.message = err.error?.msg || "Subscription failed";
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}