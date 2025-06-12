import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-digital-budget',
  templateUrl: './digital-budget.component.html',
  styleUrl: './digital-budget.component.css',
  imports: [CommonModule],
})
export class DigitalBudgetComponent implements OnDestroy {
  totalBudget = 360; // 6h in min
  allocations = [
    { label: 'Social Media', min: 130 }, // 2h10m
    { label: 'Video', min: 90 }, // 1h30m
    { label: 'Games', min: 50 }, // 50m
    { label: 'Other', min: 90}
  ];
  rollover = 17; // in min
  private intervalId: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.intervalId = globalThis.setInterval(() => {
        // Simulate budget going down in plausible pattern
        this.allocations.forEach(a => {
          if (a.min > 10) a.min -= Math.random() > 0.65 ? 1 : 0;
        });
        this.rollover += Math.random() > 0.75 ? 1 : 0;
      }, 3100);
    }
  }

  format(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m < 10 ? '0' : ''}${m}m`;
  }

  // PUBLIC_INTERFACE
  ngOnDestroy() {
    if (this.isBrowser && this.intervalId) {
      globalThis.clearInterval(this.intervalId);
    }
  }
}
