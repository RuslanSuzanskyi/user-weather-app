import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { Wrapper } from './components/wrapper/wrapper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Wrapper, UserDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'weather-app-for-users';
}
