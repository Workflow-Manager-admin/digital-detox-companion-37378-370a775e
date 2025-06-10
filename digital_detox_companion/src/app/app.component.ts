import { Component } from '@angular/core';
import { DetoxDashboardComponent } from './detox-dashboard/detox-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DetoxDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
