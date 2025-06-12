import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultService } from '../result.service';

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

  constructor(private router: Router, private resultService: ResultService) {}

  // PUBLIC_INTERFACE
  editPlans() {
    this.resultService.setResult({
      result: 'Plans Updated',
      detail: {
        updatedGoals: this.goals.filter(g => g.checked).map(g => g.label),
        message: 'Detox plan preferences saved. Adjust as needed.'
      }
    });
    this.router.navigate(['/result']);
  }
}
