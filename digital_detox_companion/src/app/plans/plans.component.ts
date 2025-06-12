import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css',
  imports: [CommonModule]
})
export class PlansComponent {
  goals = [
    { label: 'Daily Limit', desc: 'Max 1 hour/day social media', checked: true },
    { label: 'Offline Sundays', desc: 'No social media on Sundays', checked: false },
    { label: 'No use after 9pm', desc: 'Screen-free evenings', checked: true }
  ];

  constructor() {}

  // PUBLIC_INTERFACE
  editPlans() {
    // Save plan edits here (to service)
  }
}
