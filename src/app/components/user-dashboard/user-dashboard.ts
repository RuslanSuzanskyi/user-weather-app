import { Component, signal } from '@angular/core';
import { UsersService } from '../../services/users';
import { UserCard } from '../user-card/user-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, UserCard],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  users = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private userService: UsersService) {
    this.fetchUsers();
  };
  
  fetchUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data.results);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users.');
        this.loading.set(false);
      }
    });
  };
};
