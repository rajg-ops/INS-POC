import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="header">
      <h2>Admin Dashboard</h2>
      <button (click)="logout()">Logout</button>
    </div>

    <div class="content">
      <h3>Insurance Management</h3>
      <p>Admin can create and manage plans here.</p>
    </div>
  `,
  styles: [`
    .header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:#1976d2;
      color:white;
      padding:15px;
    }

    button {
      background:white;
      border:none;
      padding:8px 12px;
      cursor:pointer;
      border-radius:4px;
    }

    .content {
      padding:20px;
    }
  `]
})
export class AdminDashboardComponent {

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}