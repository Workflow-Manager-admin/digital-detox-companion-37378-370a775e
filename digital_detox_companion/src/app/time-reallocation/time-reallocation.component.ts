import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-time-reallocation',
  templateUrl: './time-reallocation.component.html',
  styleUrl: './time-reallocation.component.css',
  imports: [CommonModule],
})
export class TimeReallocationComponent implements OnDestroy {
  summary = {
    minutes: 337, // 5h37m
    activities: [
      { label: 'Walking', min: 60 },
      { label: 'Reading', min: 120 },
      { label: 'Cooking', min: 50 },
      { label: 'Socializing', min: 120 }
    ]
  };
  private more = [
    { label: 'Drawing', min: 45 },
    { label: 'Meditation', min: 30 },
    { label: 'Yoga', min: 40 },
    { label: 'Learning', min: 25 }
  ];
  private activityIdx = 0;
  private intervalId: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Animate weekly gains, shifting activities over time
      this.intervalId = globalThis.setInterval(() => {
        if (this.activityIdx < this.more.length) {
          this.summary.activities.push(this.more[this.activityIdx]);
          this.summary.minutes += this.more[this.activityIdx].min;
          this.activityIdx++;
        }
      }, 3600);
    }
  }

  format(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h}h${m ? ' ' : ''}` + (m ? `${m}m` : '') : `${m}m`;
  }

  // PUBLIC_INTERFACE
  ngOnDestroy() {
    if (this.isBrowser && this.intervalId) {
      globalThis.clearInterval(this.intervalId);
    }
  }
}
